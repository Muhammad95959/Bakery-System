import { Link } from "react-router-dom";

export default function CustomerInfo(props: { name: string; email: string; phone: string; address: string }) {
  return (
    <div className="p-6 border-t border-[rgba(87,90,56,0.26)] ">
      <div className="flex gap-6 justify-around items-center">
        <p className="flex-2/9 text-center">{props.name}</p>
        <p className="flex-2/9 text-center">{props.email}</p>
        <p className="flex-2/9 text-center">{props.phone}</p>
        <p className="flex-2/9 text-center">{props.address}</p>
        <div className="flex-1/9 flex gap-4 justify-center items-center cursor-auto">
          <Link to="/customer/update">
            <div className="image cursor-pointer bg-[#FDF8E9] text-[#DE7E0A] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-1 text-center">
              Edit
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
