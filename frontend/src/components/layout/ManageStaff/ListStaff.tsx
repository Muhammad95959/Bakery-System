import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import StaffInfo from "../../ui/StaffInfo";
import { useEffect, useState } from "react";
import type IUser from "../../../interfaces/IUser";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../ui/spinner";

export default function ListStaff() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>();
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
      .get(`${BACKEND_URL}/users`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data.data.users);
        setLoading(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [navigate]);

  function handleDeleteUser(id: string) {
    setUsers(users?.filter((user) => user.id !== id));
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] flex flex-col max-h-screen">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[48px] font-semibold">List Staff</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <div className="flex gap-6 mb-10 items-center">
            <div className="p-4 relative flex-65/100 border border-[rgba(87,90,56,0.26)] rounded-md">
              <input
                type="text"
                placeholder="Search Staff"
                className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
              />
              <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2 -z-1" />
            </div>
            <div className="relative flex-20/100">
              <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24] -z-1">&gt;</span>
              <select
                id="role"
                className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md text-[#6B3D24] appearance-none w-full"
              >
                <option disabled selected hidden>
                  Role
                </option>
                <option className="text-[#6B3D24]">All</option>
                <option className="text-[#6B3D24]">Admin</option>
                <option className="text-[#6B3D24]">Staff</option>
              </select>
            </div>
            <Link to="/manage-staff/add" className="flex-15/100">
              <button
                className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={unAuthorized}
              >
                + Add Staff
              </button>
            </Link>
          </div>
          <div className="rounded-xl border border-[rgba(87,90,56,0.26)] overflow-y-auto min-h-0">
            <div className="flex justify-around p-4 font-semibold">
              <p className="flex-1/5 text-center">Username</p>
              <p className="flex-1/5 text-center">Phone</p>
              <p className="flex-1/5 text-center">Role</p>
              <p className="flex-1/5 text-center">Status</p>
              <p className="flex-1/5 text-center">Action</p>
            </div>
            {users?.map((user: IUser, index: number) => (
              <StaffInfo
                key={index}
                id={user.id}
                username={user.username}
                phone={user.phone}
                role={user.role}
                status={user.status}
                unAuthorized={unAuthorized}
                handleDeleteUser={handleDeleteUser}
              />
            ))}
          </div>
        </div>
      )}
      <ToastContainer position="bottom-center" autoClose={3000} />
    </>
  );
}
