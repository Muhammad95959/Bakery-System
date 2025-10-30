import userIcon from "../../../assets/icon-user.svg";
import imageIcon from "../../../assets/icon-image.svg";
import { Link } from "react-router-dom";

export default function EditProduct() {
  const productsCategories = [
    "Bread",
    "Cupcake",
    "Croissant",
    "Donut",
    "Muffin",
    "Cookie",
    "Tart",
    "Brownie",
    "Pie",
    "Macaron",
    "Eclair",
    "Bagel",
    "Scone",
    "Danish",
    "Cinnamon Roll",
    "Baguette",
    "Cheesecake",
    "Fruit Tart",
    "Madeleine",
    "Pretzel",
  ];

  return (
    <div className="p-20 basis-[80%]">
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-[48px] font-semibold">Edit Product</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <form>
        <div className="flex gap-20 justify-between items-start">
          <label className="flex flex-col items-center gap-4 h-auto hover:opacity-85">
            <input hidden type="file" />
            <div className="w-72 h-72 bg-[#FFFDF2] rounded-2xl flex gap-8 flex-col justify-center items-center border-3 border-[#FBEFD1] cursor-pointer">
              <img src={imageIcon} />
              <p className="text-2xl font-semibold text-[#6B3D24]">Upload Image</p>
            </div>
          </label>
          <div className="flex-1">
            <label className="mb-5">
              <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Name</p>
              <input
                type="text"
                className="w-full mb-6 p-4 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)]"
              />
            </label>
            <label className="mb-5">
              <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Category</p>
              <div className="relative w-full mb-6 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl">
                <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
                <select className="w-full p-4 text-[rgba(107,61,36,0.9)] appearance-none caret-[rgba(87,90,56,0.52)] z-1 relative">
                  {productsCategories.map((category, index) => (
                    <option key={index} className="bg-[rgba(255,248,226,0.7)] text-[#6B3D24]">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label className="mb-5">
              <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Price</p>
              <input
                type="text"
                className="w-full mb-6 p-4 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)]"
              />
            </label>
            <label className="mb-5">
              <p className="text-2xl font-semibold text-[#6B3D24] ml-3 mb-2">Stock</p>
              <input
                type="text"
                className="w-full mb-6 p-4 bg-[#FFFDF2] border-3 border-[#FBEFD1] rounded-2xl placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)]"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="bg-[#FFAC3E] p-4 text-white font-medium text-2xl rounded-xl hover:opacity-92 w-48 cursor-pointer"
          >
            Update
          </button>
          <Link to="/products">
          <button
            type="button"
            className="bg-[#FBF7E6] p-4 text-[#6B3D24] font-medium text-2xl border border-[rgba(87,90,56,0.12)] rounded-xl hover:opacity-92 w-48 ml-6 cursor-pointer"
          >
            Cancel
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
