import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import cartIcon from "../assets/icon-cart.svg";
import cupcakeIcon from "../assets/icon-cupcake.svg";
import userIcon from "../assets/icon-user.svg";
import Sidebar from "../components/layout/Sidebar";

const lowestStockData = [
  { name: "Product A", stock: 12 },
  { name: "Product B", stock: 19 },
  { name: "Product C", stock: 3 },
  { name: "Product D", stock: 5 },
  { name: "Product E", stock: 2 },
];

const profitData = [
  { name: "Mon", profit: 4000 },
  { name: "Tue", profit: 3000 },
  { name: "Wed", profit: 2000 },
  { name: "Thu", profit: 2780 },
  { name: "Fri", profit: 1890 },
  { name: "Sat", profit: 2390 },
  { name: "Sun", profit: 3490 },
];

function Dashboard() {
  return (
    <div className="flex">
      <div className="w-[20%] min-w-[380px]">
        <Sidebar />
      </div>
      <div className="p-20 basis-[80%] flex flex-col max-h-screen">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-[48px] font-semibold">Dashboard</h1>
          <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
            <img src={userIcon} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div className="bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex gap-5 items-center">
            <div className="image bg-[#FFF4D6] w-18 h-18 rounded-2xl flex justify-center items-center">
              <img src={cartIcon} className="relative right-0.5 top-0.5" />
            </div>
            <div>
              <p className="text-xl font-medium">Today's Orders</p>
              <p className="text-2xl font-bold">200</p>
            </div>
          </div>
          <div className="bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex gap-5 items-center">
            <div className="image bg-[#FFF4D6] w-18 h-18 rounded-2xl flex justify-center items-center">
              <p className="text-5xl font-bold text-[#F8B838]">$</p>
            </div>
            <div>
              <p className="text-xl font-medium">Today's Revenue</p>
              <p className="text-2xl font-bold">$47000</p>
            </div>
          </div>
          <div className="bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex gap-5 items-center">
            <div className="image bg-[#FFF4D6] w-18 h-18 rounded-2xl flex justify-center items-center">
              <img src={cupcakeIcon} className="w-10 h-10" />
            </div>
            <div>
              <p className="text-xl font-medium">Top Product</p>
              <p className="text-2xl font-bold">Product1</p>
            </div>
          </div>
          <div className="bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex gap-5 items-center">
            <div className="image bg-[#FFF4D6] w-18 h-18 rounded-2xl flex justify-center items-center">
              <img src={cupcakeIcon} className="w-10 h-10" />
            </div>
            <div>
              <p className="text-xl font-medium">Lowest Seller</p>
              <p className="text-2xl font-bold">Product2</p>
            </div>
          </div>
        </div>
        <div className="w-full flex-1 flex gap-8">
          <div className="flex-1 h-full bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex flex-col gap-5">
            <h2 className="text-xl font-medium">Lowest Stock Products</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lowestStockData} margin={{ right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#F8B838" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 h-full bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex flex-col gap-5">
            <h2 className="text-xl font-medium">Profit (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitData} margin={{ right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#F8B838" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

