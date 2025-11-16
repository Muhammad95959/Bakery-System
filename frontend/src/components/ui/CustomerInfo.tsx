import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import editIcon from "../../assets/icon-edit.svg";
import trashIcon from "../../assets/icon-trash.svg";
import { BACKEND_URL } from "../../constants";
import DialogBox from "./DialogBox";

export default function CustomerInfo(props: {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  unAuthorized: boolean;
  handleDeleteCustomer: (id: string) => void;
}) {
  const [showDialogBox, setShowDialogBox] = useState(false);

  function deleteCustomer() {
    setShowDialogBox(true);
  }

  function handleAnswer(answer: boolean) {
    if (answer)
      axios
        .delete(`${BACKEND_URL}/customers/${props.id}`, { withCredentials: true })
        .then(() => props.handleDeleteCustomer(props.id))
        .catch((err) => toast.error(err.response.data.message));
    setShowDialogBox(false);
  }

  return (
    <div className="p-6 border-t border-[rgba(87,90,56,0.26)] ">
      <div className="flex gap-6 justify-around items-center">
        <p className="flex-1/5 text-center">{props.name}</p>
        <p className="flex-1/5 text-center">{props.email}</p>
        <p className="flex-1/5 text-center">{props.phone}</p>
        <p className="flex-1/5 text-center">{props.address}</p>
        <div className="flex-1/5 flex gap-4 justify-center items-center">
          <Link to="/customer/update" state={{ id: props.id }}>
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
            onClick={deleteCustomer}
          >
            <img src={trashIcon} />
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
      <DialogBox
        message="Are you sure you want to delete this customer?"
        confirmMessage="Yes"
        cancelMessage="No"
        showDialogBox={showDialogBox}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
