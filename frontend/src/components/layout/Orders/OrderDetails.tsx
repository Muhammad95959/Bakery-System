import axios from "axios";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL } from "../../../constants";
import type { ICart } from "../../../interfaces/IOrder";
import DialogBox from "../../ui/DialogBox";

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);
  const { id, customer, date, status, paymentMethod, cart, unAuthorized } = location.state as {
    id: string;
    customer: string;
    date: string;
    status: string;
    paymentMethod: string;
    cart: ICart[];
    unAuthorized: boolean;
  };
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  let statusColor = "";
  switch (status.toLowerCase()) {
    case "paid":
      statusColor = "#ECF8E5";
      break;
    default:
      statusColor = "#FFECD8";
  }
  let statusTextColor = "";
  switch (status.toLowerCase()) {
    case "paid":
      statusTextColor = "#003702";
      break;
    default:
      statusTextColor = "#9B0300";
  }

  function cancelOrder() {
    if (canceling) return;
    setShowDialogBox(true);
  }

  function handleAnswer(answer: boolean) {
    if (answer) {
      setCanceling(true);
      cancelRef.current?.classList.add("animate-pulse");
      axios
        .get(`${BACKEND_URL}/orders/${id}/undo-order`, { withCredentials: true })
        .then(() => navigate("/orders"))
        .catch((err) => toast.error(err.response.data.message))
        .finally(() => {
          setCanceling(false);
          cancelRef.current?.classList.remove("animate-pulse");
        });
    }
    setShowDialogBox(false);
  }

  function downloadPDF() {
    const doc = new jsPDF();
    doc.html(receiptRef.current!, {
      callback: (doc) => doc.save("receipt.pdf"),
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 800,
    });
  }

  return (
    <div className="fade-in opacity-0 p-20 basis-[80%] max-h-full flex flex-col min-w-225">
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-[48px] font-semibold">Order Details</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <div ref={receiptRef}>
        <div className="mb-8 px-12">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4 flex-1/3">
              <p className="text-xl">Order Id</p>
              <p className="text-xl font-medium">#{id}</p>
            </div>
            <div className="flex flex-col gap-2 flex-1/3">
              <p className="text-xl text-center">Status</p>
              <div className="text-center flex justify-center">
                <p className="rounded-xl py-1 px-5" style={{ backgroundColor: statusColor, color: statusTextColor }}>
                  {status}
                </p>
              </div>
            </div>
            <div className="flex-1/3" />
          </div>
        </div>
        <div className="mb-8 px-12">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 flex-1/3">
              <p className="text-xl">Customer</p>
              <p className="text-xl font-medium">{customer}</p>
            </div>
            <div className="flex flex-col gap-2 flex-1/3">
              <p className="text-xl text-center">Date</p>
              <p className="text-xl font-medium text-center">{date.split("T")[0]}</p>
            </div>
            <div className="flex-1/3" />
          </div>
        </div>
        <div className="mb-8 px-12 flex flex-col gap-2">
          <p className="text-xl">Payment Method</p>
          <p className="text-xl font-medium">{paymentMethod}</p>
        </div>
        <div className="mb-8 border-t border-[#FFD36C] w-full " />
        <div className="mb-8 px-12">
          <div className="flex justify-between items-center">
            <p className="text-xl basis-1/3">Products</p>
            <p className="text-xl basis-1/3 text-center">Quantity</p>
            <p className="text-xl basis-1/3 text-right">Total</p>
          </div>
        </div>
        {cart.map((product, index) => (
          <div key={index} className="mb-8 px-12">
            <div className="flex justify-between items-center">
              <p className="text-xl basis-1/3">{product.name}</p>
              <p className="text-xl basis-1/3 text-center">{product.quantity}</p>
              <p className="text-xl basis-1/3 text-right">${product.quantity * product.price}</p>
            </div>
          </div>
        ))}
        <div className="mb-8 border-t border-[#FFD36C] w-full " />
        <div className="mb-8 px-12 flex justify-between gap-2">
          <p className="text-xl font-bold">Total</p>
          <p className="text-xl font-bold">
            ${cart.reduce((acc, product) => acc + product.quantity * product.price, 0)}
          </p>
        </div>
      </div>
      <div className="flex gap-6 justify-end">
        <button
          type="button"
          className="bg-[#FBF7E6] text-[#6B3D24] border border-[rgba(87,90,56,0.12)] py-3 px-6 font-medium text-2xl rounded-xl hover:opacity-92 w-max cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={cancelOrder}
          disabled={status === "CANCELED" || unAuthorized}
          ref={cancelRef}
        >
          Cancel Order
        </button>
        <button
          type="button"
          className="bg-[#FFAC3E] py-3 px-6 text-white font-medium text-2xl rounded-xl hover:opacity-92 w-max cursor-pointer"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
      <DialogBox
        message="Are you sure you want to cancel this order?"
        confirmMessage="Yes"
        cancelMessage="No"
        showDialogBox={showDialogBox}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
