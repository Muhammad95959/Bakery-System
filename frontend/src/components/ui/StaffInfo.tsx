import { Link } from "react-router-dom";
import editIcon from "../../assets/icon-edit.svg";
import trashIcon from "../../assets/icon-trash.svg";

export default function StaffInfo(props: { name: string; phone: string; role: string; status: string }) {
  const statusColor = props.status.toLowerCase() === "active" ? "#ECF8E5" : "#FFECD8";
  const statusTextColor = props.status.toLowerCase() === "active" ? "#003702" : "#9B0300";
  return (
    <div className="p-6 border-t border-[rgba(87,90,56,0.26)] ">
      <div className="flex gap-6 justify-around items-center">
        <p className="flex-1/5 text-center">{props.name}</p>
        <p className="flex-1/5 text-center">{props.phone}</p>
        <p className="flex-1/5 text-center">{props.role}</p>
        <div className="flex-1/5 text-center flex justify-center">
          <p className="rounded-xl py-1 px-5" style={{ backgroundColor: statusColor, color: statusTextColor }}>
            {props.status}
          </p>
        </div>
        <div className="flex-1/5 flex gap-4 justify-center items-center">
          <Link to="/manage-staff/update">
            <div className="image cursor-pointer bg-[#FDF8E9] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-2 text-center">
              <img src={editIcon} className="relative left-0.75" />
            </div>
          </Link>
          <div className="image cursor-pointer bg-[#FDF8E9] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-2 text-center">
            <img src={trashIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
