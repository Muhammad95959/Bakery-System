import { Link } from "react-router-dom";
import detailsIcon from "../../assets/icon-details.svg";
import type { ICart } from "../../interfaces/IOrder";

export default function OrderInfo(props: {
  id: number;
  customer: string;
  date: Date;
  status: string;
  paymentMethod: string;
  cart: ICart[];
  unAuthorized: boolean;
}) {
  let statusColor = "";
  switch (props.status.toLowerCase()) {
    case "paid":
      statusColor = "#ECF8E5";
      break;
    default:
      statusColor = "#FFECD8";
  }
  let statusTextColor = "";
  switch (props.status.toLowerCase()) {
    case "paid":
      statusTextColor = "#003702";
      break;
    default:
      statusTextColor = "#9B0300";
  }

  return (
    <div className="p-6 border-t border-[rgba(87,90,56,0.26)] ">
      <div className="flex gap-6 justify-around items-center">
        <p className="flex-1/5 text-center">{props.id}</p>
        <p className="flex-1/5 text-center">{props.customer}</p>
        <p className="flex-1/5 text-center">{props.date.toString().split("T")[0]}</p>
        <div className="flex-1/5 text-center flex justify-center">
          <p className="rounded-xl py-1 px-5" style={{ backgroundColor: statusColor, color: statusTextColor }}>
            {props.status}
          </p>
        </div>
        <p className="flex-1/5 text-center">
          ${props.cart.reduce((acc, product) => acc + product.quantity * product.price, 0)}
        </p>
        <div className="flex-1/5 flex gap-4 justify-center items-center">
          <Link to="/orders/details" state={{ ...props }}>
            <div className="image cursor-pointer bg-[#DD6E42] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-2 text-center">
              <img src={detailsIcon} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
