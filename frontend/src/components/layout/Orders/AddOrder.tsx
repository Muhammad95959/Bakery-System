import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";

export default function AddOrder() {
  const productList = [
    { name: "Chocolate Cake", price: 20, stock: 15, count: 14 },
    { name: "Vanilla Cupcake", price: 5, stock: 30, count: 1 },
    { name: "Blueberry Muffin", price: 4, stock: 25, count: 6 },
    { name: "Strawberry Tart", price: 12, stock: 10, count: 2 },
    { name: "Lemon Pie", price: 15, stock: 8, count: 2 },
    { name: "Chocolate Chip Cookie", price: 3, stock: 50, count: 2 },
    { name: "Cinnamon Roll", price: 6, stock: 20, count: 2 },
    { name: "Almond Croissant", price: 7, stock: 18, count: 2 },
    { name: "Glazed Donut", price: 2, stock: 40, count: 5 },
    { name: "Classic Bagel", price: 3, stock: 22, count: 3 },
  ];
  const customers = [
    { name: "John Doe", email: "test@test.com", phone: "123-456-7890", address: "123 Main St, City, Country" },
    { name: "Jane Smith", email: "test@test.com", phone: "987-654-3210", address: "456 Elm St, City, Country" },
    { name: "Alice Johnson", email: "test@test.com", phone: "555-123-4567", address: "789 Oak St, City, Country" },
    { name: "Bob Brown", email: "test@test.com", phone: "444-987-6543", address: "321 Pine St, City, Country" },
    { name: "Charlie Davis", email: "test@test.com", phone: "333-222-1111", address: "654 Maple St, City, Country" },
  ];

  const cart = productList.slice(0, 4);

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0);

  return (
    <div className="p-20 basis-[80%] max-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-[48px] font-semibold">Add Order</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <div className="flex overflow-hidden gap-6">
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
            {productList.map((product, index) => (
              <div key={index} tabIndex={0} className="p-2 flex gap-4 items-center border border-[rgba(87,90,56,0.26)] rounded-md hover:bg-[#FFF8E2] cursor-pointer">
                <img className="w-9 h-9" />
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
                  <img className="w-9 h-9" />
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p>${product.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="mr-4 w-4 text-center">{product.count}</p>
                  <button className="cursor-pointer rounded-[50%] w-6 h-6 bg-[#FFECD8] text-[#9B0300] hover:opacity-80">
                    -
                  </button>
                  <button className="cursor-pointer rounded-[50%] w-6 h-6 bg-[#ECF8E5] text-[#003702] hover: opacity-80">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border-2 border-[rgba(87,90,56,0.26)] p-4 flex flex-col gap-4">
            <p className="text-2xl font-semibold">Customer</p>
            <div className="relative flex-20/100">
              <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 -z-1">&gt;</span>
              <select
                id="customers"
                className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md appearance-none w-full"
              >
                <option disabled selected hidden>
                  Select Customer
                </option>
                {customers.map((customer, index) => (
                  <option key={index}>
                    {customer.name} - {customer.phone}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-2xl font-semibold">Payment Method</p>
            <div className="relative flex-20/100">
              <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 -z-1">&gt;</span>
              <select
                id="payment-method"
                className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md appearance-none w-full"
              >
                <option disabled selected hidden>
                  Select Method
                </option>
                <option>Cash</option>
                <option>Visa</option>
              </select>
            </div>
            <p className="text-2xl font-semibold">Total: ${total}</p>
            <button
              type="button"
              className="bg-[#FFAC3E] p-3 text-white font-medium text-2xl rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
