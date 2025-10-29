import { Link } from "react-router-dom";
import userIcon from "../../../assets/icon-user.svg";

export default function EditStaff() {
  return (
    <div className="p-20 basis-[80%]">
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-[48px] font-semibold">Edit Staff</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <form className="p-20 shadow-[4px_4px_12px_rgba(0,0,0,0.3)] rounded-xl border border-[rgba(87,90,56,0.26)]">
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
        />
        <input
          type="text"
          placeholder="Password"
          className="w-full mb-6 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)]"
        />
        <div className="flex gap-6 mb-6">
          <input
            type="text"
            placeholder="Phone"
            className="p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] flex-1"
          />
          <div className="relative flex-1">
            <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
            <select
              id="role"
              className="border border-[rgba(87,90,56,0.26)] p-4 rounded-md text-[rgba(107,61,36,0.9)] appearance-none w-full"
            >
              <option disabled selected hidden>
                Role
              </option>
              <option className="bg-[rgba(255,248,226,0.7)] text-[#6B3D24]">All</option>
              <option className="bg-[rgba(255,248,226,0.7)] text-[#6B3D24]">Admin</option>
              <option className="bg-[rgba(255,248,226,0.7)] text-[#6B3D24]">Staff</option>
            </select>
          </div>
        </div>
        <textarea
          placeholder="Address"
          className="w-full mb-10 p-4 border border-[rgba(87,90,56,0.26)] rounded-md placeholder-[rgba(107,61,36,0.9)] h-32 resize-none"
        />
        <div className="buttons flex justify-center gap-[20%]">
          <Link
            to="/manage-staff"
            className="basis-1/4 bg-[#FBF7E6] p-4 text-[#6B3D24] font-medium text-2xl border border-[rgba(87,90,56,0.12)] rounded-xl hover:opacity-92 cursor-pointer flex justify-center items-center"
          >
            <button type="button">Cancel</button>
          </Link>
          <button
            type="button"
            className="bg-[#FFAC3E] p-4 text-white font-medium text-2xl rounded-xl hover:opacity-92 basis-1/4 cursor-pointer"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
