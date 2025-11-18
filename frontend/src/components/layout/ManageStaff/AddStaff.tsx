import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL } from "../../../constants";
import Spinner from "../../ui/spinner";

export default function AddStaff() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.data.user.role.toLowerCase() !== "admin") navigate("manage-staff");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Please login again");
          axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
          navigate("/login");
        }
      });
  }, [navigate]);

  function addUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    submitRef.current?.classList.add("animate-pulse");
    axios
      .post(
        `${BACKEND_URL}/users`,
        {
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
          phone: phoneRef.current?.value,
          role: roleRef.current?.value.toUpperCase(),
          address: addressRef.current?.value,
        },
        { withCredentials: true },
      )
      .then(() => {
        formRef.current?.reset();
        toast.success("User was added successfully");
      })
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
            <h1 className="text-[48px] font-semibold">Add Staff</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <form
            onSubmit={addUser}
            className="p-20 shadow-[4px_4px_12px_rgba(0,0,0,0.3)] rounded-xl border border-[rgba(87,90,56,0.26)]"
            ref={formRef}
          >
            <input
              required
              type="text"
              placeholder="Username"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={usernameRef}
            />
            <input
              required
              type="text"
              placeholder="Password"
              className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
              ref={passwordRef}
            />
            <div className="flex gap-6 mb-6">
              <input
                type="text"
                placeholder="Phone"
                className="p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] flex-1"
                ref={phoneRef}
              />
              <div className="relative flex-1">
                <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
                <select
                  required
                  id="role"
                  className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md text-[rgba(107,61,36,0.9)] appearance-none w-full"
                  ref={roleRef}
                >
                  <option className="text-[#6B3D24]">Admin</option>
                  <option selected={true} className="text-[#6B3D24]">
                    Staff
                  </option>
                </select>
              </div>
            </div>
            <textarea
              placeholder="Address"
              className="w-full mb-10 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] h-32 resize-none"
              ref={addressRef}
            />
            <div className="buttons flex justify-center gap-[20%]">
              <Link
                to="/manage-staff"
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
