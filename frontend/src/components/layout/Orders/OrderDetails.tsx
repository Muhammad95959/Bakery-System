import { useLocation } from "react-router-dom";
import userIcon from "../../../assets/icon-user.svg";
import type ICart from "../../../interfaces/ICart";

export default function OrderDetails() {
  const location = useLocation();
  const { id, customer, date, status, paymentMethod, cart } = location.state as {
    id: string;
    customer: string;
    date: string;
    status: string;
    paymentMethod: string;
    cart: ICart[];
  };

  let statusColor = "";
  switch (status.toLowerCase()) {
    case "pending":
      statusColor = "#FFF7D5";
      break;
    case "delivered":
      statusColor = "#ECF8E5";
      break;
    default:
      statusColor = "#FFECD8";
  }
  let statusTextColor = "";
  switch (status.toLowerCase()) {
    case "pending":
      statusTextColor = "#C75201";
      break;
    case "delivered":
      statusTextColor = "#003702";
      break;
    default:
      statusTextColor = "#9B0300";
  }

  return (
    <div className="p-20 basis-[80%] max-h-screen flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-[48px] font-semibold">Order Details</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
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
          <div className="flex-1/3"/>
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
            <p className="text-xl font-medium text-center">{date}</p>
          </div>
          <div className="flex-1/3"/>
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
            <p className="text-xl basis-1/3 text-center">{product.count}</p>
            <p className="text-xl basis-1/3 text-right">${product.count * product.price}</p>
          </div>
        </div>
      ))}
      <div className="mb-8 border-t border-[#FFD36C] w-full " />
      <div className="mb-8 px-12 flex justify-between gap-2">
        <p className="text-xl font-bold">Total</p>
        <p className="text-xl font-bold">${cart.reduce((acc, product) => acc + product.count * product.price, 0)}</p>
      </div>
      <div className="text-right">
        <button
          type="button"
          className="bg-[#FFAC3E] py-3 px-6 text-white font-medium text-2xl rounded-xl hover:opacity-92 w-max cursor-pointer"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
