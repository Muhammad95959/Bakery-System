import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify/unstyled";
import editIcon from "../../assets/icon-edit.svg";
import trashIcon from "../../assets/icon-trash.svg";
import { BACKEND_URL } from "../../constants";
import DialogBox from "./DialogBox";

export default function StaffInfo(props: {
  id: string;
  username: string;
  phone?: string;
  role: string;
  status: string;
  unAuthorized: boolean;
  handleDeleteUser: (id: string) => void;
}) {
  const statusColor = props.status.toLowerCase() === "active" ? "#ECF8E5" : "#FFECD8";
  const statusTextColor = props.status.toLowerCase() === "active" ? "#003702" : "#9B0300";
  const role = props.role[0] + props.role.slice(1).toLowerCase();
  const status = props.status[0] + props.status.slice(1).toLowerCase();
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  function deleteUser() {
    if (deleting) return;
    setShowDialogBox(true);
  }

  function handleAnswer(answer: boolean) {
    if (answer) {
      setDeleting(true);
      rowRef.current?.classList.add("animate-pulse");
      axios
        .delete(`${BACKEND_URL}/users/${props.id}`, { withCredentials: true })
        .then(() => props.handleDeleteUser(props.id))
        .catch((err) => toast.error(err.response.data.message))
        .finally(() => {
          setDeleting(false);
          rowRef.current?.classList.remove("animate-pulse");
        });
    }
    setShowDialogBox(false);
  }

  return (
    <div className="p-6 border-t border-[rgba(87,90,56,0.26)]" ref={rowRef}>
      <div className="flex gap-6 justify-around items-center">
        <p className="flex-1/5 text-center">{props.username}</p>
        <p className="flex-1/5 text-center">{props.phone}</p>
        <p className="flex-1/5 text-center">{role}</p>
        <div className="flex-1/5 text-center flex justify-center">
          <p className="rounded-xl py-1 px-5" style={{ backgroundColor: statusColor, color: statusTextColor }}>
            {status}
          </p>
        </div>
        <div className="flex-1/5 flex gap-4 justify-center items-center">
          <Link to="/manage-staff/update" state={{ id: props.id }}>
            <button
              className="image cursor-pointer bg-[#FDF8E9] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-2 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={props.unAuthorized}
            >
              <img src={editIcon} className="relative left-0.75" />
            </button>
          </Link>
          <button
            className="image cursor-pointer bg-[#FDF8E9] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-2 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={props.unAuthorized}
            onClick={deleteUser}
          >
            <img src={trashIcon} />
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
      <DialogBox
        message="Are you sure you want to delete this user?"
        confirmMessage="Yes"
        cancelMessage="No"
        showDialogBox={showDialogBox}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
