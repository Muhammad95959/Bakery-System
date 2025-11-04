import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL } from "../../../constants";
import { toast, ToastContainer } from "react-toastify";
import type IUser from "../../../interfaces/IUser";

export default function EditStaff() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state as { id: string };
  const formRef = useRef<HTMLFormElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/auth`, { withCredentials: true }).then((res) => {
      if (res.data.data.user.role.toLowerCase() !== "admin") navigate("manage-staff");
    });
    axios.get(`${BACKEND_URL}/users/${id}`, { withCredentials: true }).then((res) => setUser(res.data.data.user));
  }, [id, navigate]);

  function updateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .put(
        `${BACKEND_URL}/users/${id}`,
        {
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
          phone: phoneRef.current?.value,
          role: roleRef.current?.value.toUpperCase(),
          address: addressRef.current?.value,
        },
        { withCredentials: true },
      )
      .then(() => navigate("/manage-staff"))
      .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <div className="p-20 basis-[80%]">
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-[48px] font-semibold">Edit Staff</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <form
        onSubmit={updateUser}
        className="p-20 shadow-[4px_4px_12px_rgba(0,0,0,0.3)] rounded-xl border border-[rgba(87,90,56,0.26)]"
        ref={formRef}
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
          ref={usernameRef}
          value={user?.username}
        />
        <input
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
            value={user?.phone}
          />
          <div className="relative flex-1">
            <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
            <select
              id="role"
              className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md text-[rgba(107,61,36,0.9)] appearance-none w-full"
              ref={roleRef}
            >
              <option disabled selected hidden>
                Role
              </option>
              <option selected={user?.role === "ADMIN"} className="text-[#6B3D24]">Admin</option>
              <option selected={user?.role === "STAFF"} className="text-[#6B3D24]">Staff</option>
            </select>
          </div>
        </div>
        <textarea
          placeholder="Address"
          className="w-full mb-10 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] h-32 resize-none"
          ref={addressRef}
          value={user?.address}
        />
        <div className="buttons flex justify-center gap-[20%]">
          <Link
            to="/manage-staff"
            className="basis-1/4 bg-[#FBF7E6] p-4 text-[#6B3D24] font-medium text-2xl border border-[rgba(87,90,56,0.12)] rounded-xl hover:opacity-92 cursor-pointer flex justify-center items-center"
          >
            <button type="reset">Cancel</button>
          </Link>
          <button
            type="submit"
            className="bg-[#FFAC3E] p-4 text-white font-medium text-2xl rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
          >
            Update
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}
