import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL } from "../../../constants";
import type IOrder from "../../../interfaces/IOrder";
import OrderInfo from "../../ui/OrderInfo";
import Spinner from "../../ui/spinner";

export default function OrderList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>();
  const [status, setStatus] = useState("All");
  const [date, setDate] = useState<Date>();
  const [filteredByStatus, setFilteredByStatus] = useState<IOrder[]>();
  const [filteredByDate, setFilteredByDate] = useState<IOrder[]>();
  const [search, setSearch] = useState("");
  const [searchedOrders, setSearchedOrders] = useState<IOrder[]>();
  const [unAuthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth`, { withCredentials: true })
      .then((res) => setUnauthorized(res.data.data.user.role.toLowerCase() !== "admin"))
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Please login again");
          axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
          navigate("/login");
        }
      });
    axios
      .get(`${BACKEND_URL}/orders`, { withCredentials: true })
      .then((res) => {
        setOrders(res.data.data.orders);
        setLoading(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [navigate]);

  useEffect(() => {
    if (status === "All") setFilteredByStatus(orders);
    else setFilteredByStatus(orders?.filter((order) => order.status.toLowerCase() === status.toLowerCase()));
  }, [orders, status]);

  useEffect(() => {
    if (date === undefined) setFilteredByDate(filteredByStatus);
    else
      setFilteredByDate(
        filteredByStatus?.filter(
          (order) => order.createdAt.toString().split("T")[0] === date?.toISOString().split("T")[0],
        ),
      );
  }, [date, filteredByStatus]);

  useEffect(() => {
    if (search === "") setSearchedOrders(filteredByDate);
    else
      setSearchedOrders(
        filteredByDate?.filter(
          (order) => order.id.toString().includes(search) || order.customer.toLowerCase().includes(search.toLowerCase()),
        ),
      );
  }, [filteredByDate, search])

  function statusChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value);
  }

  function dateChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") setDate(undefined);
    else setDate(new Date(e.target.value));
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] flex flex-col max-h-full min-w-225">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[48px] font-semibold">Order List</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <div className="flex gap-6 mb-10 items-center">
            <div className="p-4 relative flex-55/100 border border-[rgba(87,90,56,0.26)] rounded-md">
              <input
                type="text"
                placeholder="Search Order"
                className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
                onChange={handleSearch}
              />
              <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2 -z-1" />
            </div>
            <div className="relative flex-15/100 border border-[rgba(87,90,56,0.26)] bg-[#FCF8E7] rounded-md">
              <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
              <select
                id="role"
                className="font-semibold p-4 text-[#6B3D24] appearance-none w-full z-1 relative"
                onChange={statusChangeHandler}
              >
                <option className="bg-white text-[#6B3D24]">All</option>
                <option className="bg-white text-[#6B3D24]">Paid</option>
                <option className="bg-white text-[#6B3D24]">Canceled</option>
              </select>
            </div>
            <input
              type="date"
              className="border border-[rgba(87,90,56,0.26)] bg-[#FCF8E7] p-4 rounded-md text-[#6B3D24] flex-15/100"
              onChange={dateChangeHandler}
            />
            <Link to="/orders/add" className="flex-15/100">
              <button className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full">
                New Order
              </button>
            </Link>
          </div>
          <div className="rounded-xl border border-[rgba(87,90,56,0.26)] overflow-y-auto min-h-0">
            <div className="flex justify-around p-4 font-semibold">
              <p className="flex-1/6 text-center">Order Id</p>
              <p className="flex-1/6 text-center">Customer</p>
              <p className="flex-1/6 text-center">Date</p>
              <p className="flex-1/6 text-center">Status</p>
              <p className="flex-1/6 text-center">Total</p>
              <p className="flex-1/6 text-center">Detail</p>
            </div>
            {[...(searchedOrders || [])].reverse().map((order) => (
              <OrderInfo
                key={order.id}
                id={order.id}
                customer={order.customer}
                date={order.createdAt}
                status={order.status}
                paymentMethod={order.paymentMethod}
                cart={order.cart}
                unAuthorized={unAuthorized}
              />
            ))}
          </div>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
