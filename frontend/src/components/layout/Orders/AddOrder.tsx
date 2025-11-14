import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL, paymentMethods } from "../../../constants";
import type ICustomer from "../../../interfaces/ICustomer";
import type { ICart } from "../../../interfaces/IOrder";
import type IProduct from "../../../interfaces/IProduct";
import Spinner from "../../ui/spinner";

export default function AddOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  interface CartWithId extends ICart {
    id: number;
  }
  const [cart, setCart] = useState<CartWithId[]>([]);
  const [total, setTotal] = useState(0);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const customerRef = useRef<HTMLSelectElement>(null);
  const paymentMethodRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/auth`, { withCredentials: true }).catch((err) => {
      if (err.response.status === 401) {
        alert("Please login again");
        axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
        navigate("/login");
      }
    });
    axios
      .get(`${BACKEND_URL}/products`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data.data.products);
        setLoading(false);
      })
      .catch((err) => toast.error(err.response.data.message));
    axios
      .get(`${BACKEND_URL}/customers`, { withCredentials: true })
      .then((res) => {
        setCustomers(res.data.data.customers);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [navigate]);

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [cart]);

  function addProductToCart(e: React.MouseEvent<HTMLDivElement, MouseEvent>, product: IProduct) {
    e.preventDefault();
    if (cart.some((item) => item.id === product.id)) {
      setCart((p) => {
        const stock = products.find((item) => item.id === product.id)?.stock || 0;
        if (stock <= (p.find((item) => item.id === product.id)?.quantity || 0)) return p;
        else return p.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      });
    } else
      setCart((p) => [
        ...p,
        { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 },
      ]);
  }

  function reduceProductQuantity(id: number) {
    setCart((p) => {
      const product = p.find((item) => item.id === id);
      if (product?.quantity === 1) return p.filter((item) => item.id !== id);
      else return p.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
    });
  }

  function increaseProductQuantity(id: number) {
    setCart((p) => {
      const product = p.find((item) => item.id === id);
      const stock = products.find((item) => item.id === id)?.stock || 0;
      if (stock <= (product?.quantity || 0)) return p;
      else return p.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    });
  }

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cart.length === 0) return toast("Cart is empty");
    axios
      .post(
        `${BACKEND_URL}/orders/place-order`,
        {
          customer: customerRef.current?.value,
          status: "PENDING",
          paymentMethod: paymentMethodRef.current?.value.replace(" ", "_"),
          orderItems: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
        },
        { withCredentials: true },
      )
      .then(() => navigate("/orders"))
      .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] max-h-screen flex flex-col">
          <div className="flex justify-between items-center mb-20">
            <h1 className="text-[48px] font-semibold">Add Order</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <div className="flex overflow-hidden gap-6 select-none">
            {/* left side */}
            <div className="flex flex-col gap-6 basis-1/3">
              <div className="p-4 relative border border-[rgba(87,90,56,0.26)] rounded-md">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
                />
                <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2" />
              </div>
              <div className="rounded-xl border-2 border-[rgba(87,90,56,0.26)] overflow-y-auto p-4 flex flex-col gap-4">
                {products.map((product, index) => (
                  <div
                    key={index}
                    tabIndex={0}
                    className="p-2 flex gap-4 items-center border border-[rgba(87,90,56,0.26)] rounded-md hover:bg-[#FFF8E2] cursor-pointer"
                    onClick={(e) => addProductToCart(e, product)}
                  >
                    <img
                      src={`${BACKEND_URL.replace("/api", "/images")}/${product.image}`}
                      className="w-9 h-9 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p>stock: {product.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col gap-6 basis-2/3">
              <div className="rounded-xl border-2 border-[rgba(87,90,56,0.26)] overflow-y-auto p-4 flex flex-col gap-4">
                <p className="text-2xl font-semibold">Cart Summary</p>
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="p-2 flex gap-4 items-center justify-between border border-[rgba(87,90,56,0.26)] rounded-md"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={`${BACKEND_URL.replace("/api", "/images")}/${product.image}`}
                        className="w-9 h-9 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-bold">{product.name}</p>
                        <p>${product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="mr-4 w-4 text-center">{product.quantity}</p>
                      <button
                        className="cursor-pointer rounded-[50%] w-6 h-6 bg-[#FFECD8] text-[#9B0300] hover:opacity-80"
                        onClick={() => reduceProductQuantity(product.id)}
                      >
                        -
                      </button>
                      <button
                        className="cursor-pointer rounded-[50%] w-6 h-6 bg-[#ECF8E5] text-[#003702] hover: opacity-80"
                        onClick={() => increaseProductQuantity(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={placeOrder}
                className="rounded-xl border-2 border-[rgba(87,90,56,0.26)] p-4 flex flex-col gap-4"
              >
                <p className="text-2xl font-semibold">Customer</p>
                <div className="relative flex-20/100">
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 -z-1">&gt;</span>
                  <select
                    id="customers"
                    className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md appearance-none w-full"
                    ref={customerRef}
                  >
                    <option>Customer</option>
                    {customers.map((customer, index) => (
                      <option key={index}>{customer.name}</option>
                    ))}
                  </select>
                </div>
                <p className="text-2xl font-semibold">Payment Method</p>
                <div className="relative flex-20/100">
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 -z-1">&gt;</span>
                  <select
                    id="payment-method"
                    className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md appearance-none w-full"
                    ref={paymentMethodRef}
                  >
                    {paymentMethods.map((method, index) => (
                      <option key={index}>{method.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
                <p className="text-2xl font-semibold">Total: ${total}</p>
                <button
                  type="submit"
                  className="bg-[#FFAC3E] p-3 text-white font-medium text-2xl rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
