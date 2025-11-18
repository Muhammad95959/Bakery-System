import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL } from "../../../constants";
import type ICustomer from "../../../interfaces/ICustomer";
import Spinner from "../../ui/spinner";

export default function EditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state as { id: string };
  const [customer, setCustomer] = useState<ICustomer>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.data.user.role.toLowerCase() !== "admin") navigate("/customer");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Please login again");
          axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
          navigate("/login");
        }
      });
    axios
      .get(`${BACKEND_URL}/customers/${id}`, { withCredentials: true })
      .then((res) => {
        setCustomer(res.data.data.customer);
        setLoading(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [id, navigate]);

  function updateCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    submitRef.current?.classList.add("animate-pulse");
    axios
      .put(
        `${BACKEND_URL}/customers/${id}`,
        {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          phone: phoneRef.current?.value,
          address: addressRef.current?.value,
        },
        { withCredentials: true },
      )
      .then(() => navigate("/customer"))
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {
        setSubmitting(false);
        submitRef.current?.classList.remove("animate-pulse");
      });
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="fade-in opacity-0 p-20 basis-[80%] min-w-225">
          <div className="flex justify-between items-center mb-20">
            <h1 className="text-[48px] font-semibold">Edit Customer</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <form
            onSubmit={updateCustomer}
            className="p-20 shadow-[4px_4px_12px_rgba(0,0,0,0.3)] rounded-xl border border-[rgba(87,90,56,0.26)]"
          >
            <input
              required
              type="text"
              placeholder="name"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={nameRef}
              defaultValue={customer?.name}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={emailRef}
              defaultValue={customer?.email}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={phoneRef}
              defaultValue={customer?.phone}
            />
            <textarea
              placeholder="Address"
              className="w-full mb-10 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] h-32 resize-none"
              ref={addressRef}
              defaultValue={customer?.address}
            />
            <div className="buttons flex justify-center gap-[20%]">
              <Link
                to="/customer"
                className="basis-1/4 bg-[#FBF7E6] p-4 text-[#6B3D24] font-medium text-2xl border border-[rgba(87,90,56,0.12)] rounded-xl hover:opacity-92 cursor-pointer flex justify-center items-center"
              >
                <button type="reset" className="cursor-pointer">
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="bg-[#FFAC3E] p-4 text-white font-medium text-2xl rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
                ref={submitRef}
              >
                Update
              </button>
            </div>
          </form>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
