import { Link } from "react-router-dom";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import OrderInfo from "../../ui/OrderInfo";

export default function OrderList() {
  const orderList = [
    {
      id: "1",
      customer: "John Doe",
      date: "2023-10-01",
      status: "Pending",
      paymentMethod: "Visa",
      cart: [{ name: "Chocolate Cake", price: 20, count: 14 }],
    },
    {
      id: "2",
      customer: "Jane Smith",
      date: "2023-10-02",
      status: "Delivered",
      paymentMethod: "Cash",
      cart: [
        { name: "Vanilla Cupcake", price: 5, count: 1 },
        { name: "Blueberry Muffin", price: 4, count: 6 },
      ],
    },
    {
      id: "3",
      customer: "Mike Johnson",
      date: "2023-10-03",
      status: "Canceled",
      paymentMethod: "Cash",
      cart: [
        { name: "Strawberry Tart", price: 12, count: 2 },
        { name: "Lemon Pie", price: 15, count: 2 },
        { name: "Chocolate Chip Cookie", price: 3, count: 2 },
      ],
    },
    {
      id: "4",
      customer: "Emily Davis",
      date: "2023-10-04",
      status: "Pending",
      paymentMethod: "Visa",
      cart: [
        { name: "Cinnamon Roll", price: 6, count: 2 },
        { name: "Almond Croissant", price: 7, count: 2 },
        { name: "Glazed Donut", price: 2, count: 5 },
        { name: "Classic Bagel", price: 3, count: 3 },
        { name: "Pumpkin Spice Latte", price: 4, count: 1 },
        { name: "Iced Coffee", price: 3, count: 2 },
        { name: "Herbal Tea", price: 2, count: 1 },
        { name: "Fruit Smoothie", price: 5, count: 1 },
      ],
    },
    {
      id: "5",
      customer: "David Wilson",
      date: "2023-10-05",
      status: "Delivered",
      paymentMethod: "Cash",
      cart: [
        { name: "Chocolate Cake", price: 20, count: 5 },
        { name: "Vanilla Cupcake", price: 5, count: 10 },
        { name: "Blueberry Muffin", price: 4, count: 15 },
      ],
    },
    {
      id: "6",
      customer: "Sarah Brown",
      date: "2023-10-06",
      status: "Canceled",
      paymentMethod: "Visa",
      cart: [
        { name: "Strawberry Tart", price: 12, count: 3 },
        { name: "Lemon Pie", price: 15, count: 1 },
      ],
    },
  ];

  return (
    <div className="p-20 basis-[80%] flex flex-col max-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-[48px] font-semibold">Order List</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <div className="flex gap-6 mb-10 items-center">
        <div className="p-4 relative flex-55/100 border border-[rgba(87,90,56,0.26)] rounded-md">
          <input
            type="text"
            placeholder="Search Order"
            className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
          />
          <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2 -z-1" />
        </div>
        <div className="relative flex-15/100 border border-[rgba(87,90,56,0.26)] bg-[#FCF8E7] rounded-md">
          <span className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[#6B3D24]">&gt;</span>
          <select id="role" className="font-semibold p-4 text-[#6B3D24] appearance-none w-full z-1 relative">
            <option disabled selected hidden>
              Status
            </option>
            <option className="bg-white text-[#6B3D24]">All</option>
            <option className="bg-white text-[#6B3D24]">Pending</option>
            <option className="bg-white text-[#6B3D24]">Delivered</option>
            <option className="bg-white text-[#6B3D24]">Canceled</option>
          </select>
        </div>
        <input
          type="date"
          className="border border-[rgba(87,90,56,0.26)] bg-[#FCF8E7] p-4 rounded-md text-[#6B3D24] flex-15/100"
        />
        <Link to="/orders/add" className="flex-15/100">
          <button className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full">
            New Order
          </button>
        </Link>
      </div>
      <div className="rounded-xl border border-[rgba(87,90,56,0.26)] overflow-y-auto min-h-0">
        <div className="flex justify-around p-4 font-semibold">
          <p className="flex-1/6 text-center">Order Id</p>
          <p className="flex-1/6 text-center">Customer</p>
          <p className="flex-1/6 text-center">Date</p>
          <p className="flex-1/6 text-center">Status</p>
          <p className="flex-1/6 text-center">Total</p>
          <p className="flex-1/6 text-center">Detail</p>
        </div>
        {orderList.map((order) => (
          <OrderInfo
            key={order.id}
            id={order.id}
            customer={order.customer}
            date={order.date}
            status={order.status}
            paymentMethod={order.paymentMethod}
            cart={order.cart}
          />
        ))}
      </div>
    </div>
  );
}
