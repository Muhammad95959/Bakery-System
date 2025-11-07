import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import genericImage from "../../assets/icon-generic-image.svg";
import { BACKEND_URL } from "../../constants";

export default function ProductInfo(props: {
  image?: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  unAuthorized: boolean;
  handleDeleteProduct: (id: number) => void;
}) {
  const imagePath = (props.image && `${BACKEND_URL.replace("/api", "/images")}/${props.image}`) || genericImage;

  function deleteProduct() {
    axios
      .delete(`${BACKEND_URL}/products/${props.id}`, { withCredentials: true })
      .then(() => props.handleDeleteProduct(props.id))
      .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <div className="p-6 border-t border-[rgba(87,90,56,0.26)] ">
      <div className="flex gap-6 justify-around items-center">
        <div className="flex-1/6 flex justify-center items-center">
          <img src={imagePath} className="w-12 h-12 rounded-2xl object-cover" />
        </div>
        <p className="flex-1/6 text-center">{props.name}</p>
        <p className="flex-1/6 text-center">{props.price}</p>
        <p className="flex-1/6 text-center">{props.stock}</p>
        <p className="flex-1/6 text-center">{props.category}</p>
        <div className="flex-1/6 flex gap-4 justify-center items-center">
          <Link to="/products/update" state={{ id: props.id }}>
            <button
              className="image cursor-pointer bg-[#FDF8E9] text-[#DE7E0A] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-1 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={props.unAuthorized}
            >
              Edit
            </button>
          </Link>
          <button
            className="image cursor-pointer bg-[#DD6E42] text-[#FEFFFE] rounded-md border border-[rgba(87,90,56,0.1)] px-3 py-1 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={props.unAuthorized}
            onClick={deleteProduct}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
