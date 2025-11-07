import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import filterIcon from "../../../assets/icon-filter.svg";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL, productCategories } from "../../../constants";
import type IProduct from "../../../interfaces/IProduct";
import ProductInfo from "../../ui/ProductInfo";
import Spinner from "../../ui/spinner";

export default function ListProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>();
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>();
  const [loading, setLoading] = useState(true);
  const [unAuthorized, setUnAuthorized] = useState(false);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth`, { withCredentials: true })
      .then((res) => setUnAuthorized(res.data.data.user.role.toLowerCase() !== "admin"))
      .catch((err) => {
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
  }, [navigate]);

  useEffect(() => {
    if (category === "All") setFilteredProducts(products);
    else setFilteredProducts(products?.filter((product) => product.category === category));
  }, [products, category]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    if (search === "") setSearchedProducts(undefined);
    else
      setSearchedProducts(
        filteredProducts?.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.price.toString().includes(search) ||
            product.stock.toString().includes(search),
        ),
      );
  }

  function handleChangeProduct(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }

  function handleDeleteProduct(id: number) {
    setProducts(products?.filter((product) => product.id !== id));
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] flex flex-col max-h-screen">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[48px] font-semibold">Products</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <div className="flex gap-6 mb-10 items-center">
            <div className="p-4 relative flex-65/100 border border-[rgba(87,90,56,0.26)] rounded-md">
              <input
                type="text"
                placeholder="Search Products"
                className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
                onChange={handleSearch}
              />
              <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2 -z-1" />
            </div>
            <div className="relative flex flex-20/100 border border-[rgba(87,90,56,0.26)] rounded-md">
              <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24] -z-1">&gt;</span>
              <img src={filterIcon} className="absolute left-5 top-1/2 -translate-y-1/2 -z-1" />
              <select
                id="filter"
                className="p-4 pl-15 text-[#6B3D24] appearance-none w-full"
                onChange={handleChangeProduct}
              >
                <option className="text-[#6B3D24]">All</option>
                {productCategories.map((product, index) => (
                  <option className="text-[#6B3D24]" key={index}>
                    {product}
                  </option>
                ))}
              </select>
            </div>
            <Link to="/products/add" className="flex-15/100">
              <button
                className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={unAuthorized}
              >
                + Add Product
              </button>
            </Link>
          </div>
          <div className="rounded-xl border border-[rgba(87,90,56,0.26)] overflow-y-auto min-h-0">
            <div className="flex justify-around p-4 font-semibold">
              <p className="flex-1/6 text-center">Image</p>
              <p className="flex-1/6 text-center">Name</p>
              <p className="flex-1/6 text-center">Price</p>
              <p className="flex-1/6 text-center">Stock</p>
              <p className="flex-1/6 text-center">Category</p>
              <p className="flex-1/6 text-center">Action</p>
            </div>
            {[...(searchedProducts || filteredProducts || [])].reverse().map((product, index) => (
              <ProductInfo
                key={index}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                stock={product.stock}
                category={product.category}
                unAuthorized={unAuthorized}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
