import { Link } from "react-router-dom";

export default function StaffInfo(props: { image?: string; name: string; price: string; stock: string, category: string }) {
  return (
    <div className="p-6 border-t border-[rgba(87,90,56,0.26)] ">
      <div className="flex gap-6 justify-around items-center">
        <p className="flex-1/6 text-center">{props.image}</p>
        <p className="flex-1/6 text-center">{props.name}</p>
        <p className="flex-1/6 text-center">{props.price}</p>
        <p className="flex-1/6 text-center">{props.stock}</p>
        <p className="flex-1/6 text-center">{props.category}</p>
        <div className="flex-1/6 flex gap-4 justify-center items-center">
          <Link to="/products/update">
            <div className="image cursor-pointer bg-[#FDF8E9] text-[#DE7E0A] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-1 text-center">
              Edit
            </div>
          </Link>
            <div className="image cursor-pointer bg-[#DD6E42] text-[#FEFFFE] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-1 text-center">
              Delete
            </div>
        </div>
      </div>
    </div>
  );
}
