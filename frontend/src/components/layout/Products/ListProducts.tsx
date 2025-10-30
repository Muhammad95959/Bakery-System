import { Link } from "react-router-dom";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import filterIcon from "../../../assets/icon-filter.svg";
import ProductInfo from "../../ui/ProductInfo";

export default function ListProducts() {
  const productsCategories = [
    "All",
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

  const productList = [
    { name: "Chocolate Cake", price: "$20", stock: "15", category: "Cake" },
    { name: "Vanilla Cupcake", price: "$5", stock: "30", category: "Cupcake" },
    { name: "Blueberry Muffin", price: "$4", stock: "25", category: "Muffin" },
    { name: "Strawberry Tart", price: "$12", stock: "10", category: "Tart" },
    { name: "Lemon Pie", price: "$15", stock: "8", category: "Pie" },
    { name: "Chocolate Chip Cookie", price: "$3", stock: "50", category: "Cookie" },
    { name: "Cinnamon Roll", price: "$6", stock: "20", category: "Pastry" },
    { name: "Almond Croissant", price: "$7", stock: "18", category: "Pastry" },
    { name: "Glazed Donut", price: "$2", stock: "40", category: "Donut" },
    { name: "Classic Bagel", price: "$3", stock: "22", category: "Bread" },
  ];

  return (
    <div className="p-20 basis-[80%] flex flex-col max-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-[48px] font-semibold">Products</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <div className="flex gap-6 mb-10 items-center">
        <div className="p-4 relative flex-65/100 border border-[rgba(87,90,56,0.26)] rounded-md">
          <input
            type="text"
            placeholder="Search Products"
            className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
          />
          <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2 -z-1" />
        </div>
        <div className="relative flex flex-20/100 border border-[rgba(87,90,56,0.26)] rounded-md">
          <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24] -z-1">&gt;</span>
          <img src={filterIcon} className="absolute left-5 top-1/2 -translate-y-1/2 -z-1" />
          <select id="filter" className="p-4 pl-15 text-[#6B3D24] appearance-none w-full">
            <option disabled selected hidden>
              Filter
            </option>
            {productsCategories.map((product, index) => (
              <option className="text-[#6B3D24]" key={index}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <Link to="/products/add" className="flex-15/100">
          <button className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full">
            + Add Product
          </button>
        </Link>
      </div>
      <div className="rounded-xl border border-[rgba(87,90,56,0.26)] overflow-y-auto min-h-0">
        <div className="flex justify-around p-4 font-semibold">
          <p className="flex-1/6 text-center">Image</p>
          <p className="flex-1/6 text-center">Name</p>
          <p className="flex-1/6 text-center">Price</p>
          <p className="flex-1/6 text-center">Stock</p>
          <p className="flex-1/6 text-center">Category</p>
          <p className="flex-1/6 text-center">Action</p>
        </div>
        {productList.map((product, index) => (
          <ProductInfo
            key={index}
            name={product.name}
            price={product.price}
            stock={product.stock}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}
