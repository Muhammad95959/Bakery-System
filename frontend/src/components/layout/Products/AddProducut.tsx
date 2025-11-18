import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import imageIcon from "../../../assets/icon-image.svg";
import trashIcon from "../../../assets/icon-trash.svg";
import userIcon from "../../../assets/icon-user.svg";
import { BACKEND_URL, productCategories } from "../../../constants";
import Spinner from "../../ui/spinner";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.data.user.role.toLowerCase() !== "admin") navigate("/products");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Please login again");
          axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
          navigate("/login");
        }
      });
  }, [navigate]);

  function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    submitRef.current?.classList.add("animate-pulse");
    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    if (nameRef.current?.value) formData.append("name", nameRef.current.value);
    if (categoryRef.current?.value) formData.append("category", categoryRef.current.value);
    if (priceRef.current?.value) formData.append("price", priceRef.current.value);
    if (stockRef.current?.value) formData.append("stock", stockRef.current.value);
    axios
      .post(`${BACKEND_URL}/products`, formData, { withCredentials: true })
      .then(() => {
        formRef.current?.reset();
        setImageUrl("");
        setImageFile(undefined);
        toast.success("Product was added successfully");
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {
        setSubmitting(false);
        submitRef.current?.classList.remove("animate-pulse");
      });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setImageUrl(imgUrl);
    setImageFile(file);
  }

  function handleRemovingImage() {
    setImageUrl("");
    setImageFile(undefined);
  }

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] min-w-225">
          <div className="flex justify-between items-center mb-20">
            <h1 className="text-[48px] font-semibold">Add Product</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <form onSubmit={addProduct} ref={formRef}>
            <div className="flex gap-20 justify-between items-start">
              <div className="flex flex-col items-center gap-4 h-auto relative">
                <label className="hover:opacity-85">
                  <input hidden type="file" accept="image/*" ref={imageRef} onChange={handleFileChange} />
                  {(imageUrl && (
                    <img src={imageUrl} className="w-72 h-72 rounded-2xl cursor-pointer object-cover" />
                  )) || (
                    <div className="w-72 h-72 bg-[#FFFDF2] rounded-2xl flex gap-8 flex-col justify-center items-center border-3 border-[#FBEFD1] cursor-pointer">
                      <img src={imageIcon} />
                      <p className="text-2xl font-semibold text-[#6B3D24]">Upload Image</p>
                    </div>
                  )}
                </label>
                <div
                  className="absolute bottom-4 right-4 rounded-full border-2 border-[#6B3D24] w-10 h-10 flex justify-center items-center z-1 bg-[#FFFFF6] hover:bg-[#FBEBC4] cursor-pointer"
                  style={{ display: imageUrl ? "flex" : "none" }}
                  onClick={handleRemovingImage}
                  tabIndex={0}
                >
                  <img
                    src={trashIcon}
                    className="w-4 h-4 filter-[brightness(0)saturate(100%)invert(23%)sepia(77%)saturate(404%)hue-rotate(337deg)brightness(94%)contrast(94%)]"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="mb-5">
                  <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Name</p>
                  <input
                    required
                    type="text"
                    className="w-full mb-6 p-4 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)]"
                    ref={nameRef}
                  />
                </label>
                <label className="mb-5">
                  <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Category</p>
                  <div className="relative w-full mb-6 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl">
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
                    <select
                      className="w-full p-4 text-[rgba(107,61,36,0.9)] appearance-none caret-[rgba(87,90,56,0.52)] z-1 relative"
                      ref={categoryRef}
                    >
                      {productCategories.map((category, index) => (
                        <option key={index} className="text-[#6B3D24]">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <label className="mb-5">
                  <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Price</p>
                  <input
                    required
                    type="text"
                    className="w-full mb-6 p-4 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)]"
                    ref={priceRef}
                  />
                </label>
                <label className="mb-5">
                  <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Stock</p>
                  <input
                    required
                    type="text"
                    className="w-full mb-6 p-4 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)]"
                    ref={stockRef}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-[#FFAC3E] p-4 text-white font-medium text-2xl rounded-xl hover:opacity-92 w-48 cursor-pointer"
                ref={submitRef}
              >
                Save
              </button>
              <Link to="/products">
                <button
                  type="reset"
                  className="bg-[#FBF7E6] p-4 text-[#6B3D24] font-medium text-2xl border border-[rgba(87,90,56,0.12)] rounded-xl hover:opacity-92 w-48 ml-6 cursor-pointer"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
