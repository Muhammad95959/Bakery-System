import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL } from "../../../constants";
import Spinner from "../../ui/spinner";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emialRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth`, { withCredentials: true })
      .then(() => setLoading(false))
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Please login again");
          axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
          navigate("/login");
        }
      });
  }, [navigate]);

  function addCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post(
        `${BACKEND_URL}/customers`,
        {
          name: nameRef.current?.value,
          email: emialRef.current?.value,
          phone: phoneRef.current?.value,
          address: addressRef.current?.value,
        },
        { withCredentials: true },
      )
      .then(() => {
        formRef.current?.reset();
        toast.success("Customer was added successfully");
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] min-w-225">
          <div className="flex justify-between items-center mb-20">
            <h1 className="text-[48px] font-semibold">Add Customer</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <form
            onSubmit={addCustomer}
            className="p-20 shadow-[4px_4px_12px_rgba(0,0,0,0.3)] rounded-xl border border-[rgba(87,90,56,0.26)]"
            ref={formRef}
          >
            <input
              required
              type="text"
              placeholder="name"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={nameRef}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={emialRef}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={phoneRef}
            />
            <textarea
              placeholder="Address"
              className="w-full mb-10 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] h-32 resize-none"
              ref={addressRef}
            />
            <div className="buttons flex justify-center gap-[20%]">
              <Link
                to="/customer"
                className="basis-1/4 bg-[#FBF7E6] p-4 text-[#6B3D24] font-medium text-2xl border border-[rgba(87,90,56,0.12)] rounded-xl hover:opacity-92 cursor-pointer flex justify-center items-center"
              >
                <button type="reset" className="cursor-pointer">Cancel</button>
              </Link>
              <button
                type="submit"
                className="bg-[#FFAC3E] p-4 text-white font-medium text-2xl rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
              >
                Add
              </button>
            </div>
          </form>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
