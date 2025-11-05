import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL } from "../../../constants";
import type ICustomer from "../../../interfaces/ICustomer";
import CustomerInfo from "../../ui/CustomerInfo";
import Spinner from "../../ui/spinner";

export default function ListCustomers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<ICustomer[]>();
  const [loading, setLoading] = useState(true);
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
      .get(`${BACKEND_URL}/customers`, { withCredentials: true })
      .then((res) => {
        setCustomers(res.data.data.customers);
        setLoading(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [navigate]);

  function handleDeleteCustomer(id: string) {
    setCustomers((customers) => customers?.filter((customer) => customer.id !== id));
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] flex flex-col max-h-screen">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[48px] font-semibold">Customers</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <div className="flex gap-6 mb-10 items-center">
            <div className="p-4 relative flex-85/100 border border-[rgba(87,90,56,0.26)] rounded-md">
              <input
                type="text"
                placeholder="Search Customer"
                className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
              />
              <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2 -z-1" />
            </div>
            <Link to="/customer/add" className="flex-15/100">
              <button className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full">
                + Add Customer
              </button>
            </Link>
          </div>
          <div className="rounded-xl border border-[rgba(87,90,56,0.26)] overflow-y-auto min-h-0">
            <div className="flex justify-around p-4 font-semibold">
              <p className="flex-1/5 text-center">Name</p>
              <p className="flex-1/5 text-center">Email</p>
              <p className="flex-1/5 text-center">Phone</p>
              <p className="flex-1/5 text-center">Address</p>
              <p className="flex-1/5 text-center">Action</p>
            </div>
            {customers?.map((customer, index) => (
              <CustomerInfo
                key={index}
                id={customer.id}
                name={customer.name}
                email={customer.email}
                phone={customer.phone}
                address={customer.address}
                unAuthorized={unAuthorized}
                handleDeleteCustomer={handleDeleteCustomer}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
