import { Link } from "react-router-dom";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import StaffInfo from "../../ui/StaffInfo";

export default function ListStaff() {
  const staffList = [
    { username: "John Doe", phone: "123-456-7890", role: "Admin", status: "Active" },
    { username: "Jane Smith", phone: "987-654-3210", role: "Staff", status: "Inactive" },
    { username: "Alice Johnson", phone: "555-123-4567", role: "Staff", status: "Active" },
    { username: "Bob Brown", phone: "444-987-6543", role: "Admin", status: "Active" },
    { username: "Charlie Davis", phone: "333-222-1111", role: "Staff", status: "Inactive" },
  ];

  return (
    <div className="p-20 basis-[80%]">
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
          <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
          <select
            id="role"
            className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md text-[#6B3D24] appearance-none w-full"
          >
            <option disabled selected hidden>
              Role
            </option>
            <option className="bg-[rgba(255,248,226,0.7)] text-[#6B3D24]">All</option>
            <option className="bg-[rgba(255,248,226,0.7)] text-[#6B3D24]">Admin</option>
            <option className="bg-[rgba(255,248,226,0.7)] text-[#6B3D24]">Staff</option>
          </select>
        </div>
        <Link to="/manage-staff/add" className="flex-15/100">
          <button className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full">
            + Add Staff
          </button>
        </Link>
      </div>
      <div className="rounded-xl border border-[rgba(87,90,56,0.26)]">
        <div className="flex justify-around p-4 font-semibold">
          <p className="flex-1/5 text-center">Username</p>
          <p className="flex-1/5 text-center">Phone</p>
          <p className="flex-1/5 text-center">Role</p>
          <p className="flex-1/5 text-center">Status</p>
          <p className="flex-1/5 text-center">Action</p>
        </div>
        {staffList.map((staff, index) => (
          <StaffInfo key={index} username={staff.username} phone={staff.phone} role={staff.role} status={staff.status} />
        ))}
      </div>
    </div>
  );
}
