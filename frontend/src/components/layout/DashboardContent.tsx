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
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import cartIcon from "../../assets/icon-cart.svg";
import cupcakeIcon from "../../assets/icon-cupcake.svg";
import userIcon from "../../assets/icon-user.svg";
import { BACKEND_URL } from "../../constants";
import Spinner from "../ui/spinner";

export default function DashboardContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ordersToday, setOrdersToday] = useState(0);
  const [revenueToday, setRevenueToday] = useState(0);
  const [topProduct, setTopProduct] = useState("--");
  const [lowestStockProducts, setLowestStockProducts] = useState<{ name: string; stock: number }[]>([]);
  const [revenueData, setRevenueData] = useState<{ day: string; revenue: number }[]>([]);

  useEffect(() => {
    async function authorize() {
      try {
        await axios.get(`${BACKEND_URL}/auth`, { withCredentials: true });
        setLoading(false);
        axios
          .get(`${BACKEND_URL}/analytics/orders-today`, { withCredentials: true })
          .then((res) => setOrdersToday(res.data.data.count))
          .catch((err) => toast.error(err.response.data.message));
        axios
          .get(`${BACKEND_URL}/analytics/top-product`, { withCredentials: true })
          .then((res) => setTopProduct(res.data.data.name))
          .catch((err) => toast.error(err.response.data.message));
        axios
          .get(`${BACKEND_URL}/analytics/lowest-stock-products`, { withCredentials: true })
          .then((res) => setLowestStockProducts(res.data.data))
          .catch((err) => toast.error(err.response.data.message));
        axios
          .get(`${BACKEND_URL}/analytics/week-revenue`, { withCredentials: true })
          .then((res) => {
            setRevenueData(res.data.data);
            setRevenueToday(res.data.data[6].revenue);
          })
          .catch((err) => toast.error(err.response.data.message));
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          alert("Please login again");
          axios.get(`${BACKEND_URL}/auth/logout`, { withCredentials: true });
          navigate("/login");
        }
      }
    }
    authorize();
  }, [navigate]);

  return (
    <>
      {(loading && <Spinner />) || (
        <div className="p-20 basis-[80%] flex flex-col max-h-screen">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[48px] font-semibold">Dashboard</h1>
            <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
              <img src={userIcon} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex gap-5 items-center">
              <div className="image bg-[#FFF4D6] w-18 h-18 rounded-2xl flex justify-center items-center">
                <img src={cartIcon} className="relative right-0.5 top-0.5" />
              </div>
              <div>
                <p className="text-xl font-medium">Today's Orders</p>
                <p className="text-2xl font-bold">{ordersToday}</p>
              </div>
            </div>
            <div className="bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex gap-5 items-center">
              <div className="image bg-[#FFF4D6] w-18 h-18 rounded-2xl flex justify-center items-center">
                <p className="text-5xl font-bold text-[#F8B838]">$</p>
              </div>
              <div>
                <p className="text-xl font-medium">Today's Revenue</p>
                <p className="text-2xl font-bold">${revenueToday}</p>
              </div>
            </div>
            <div className="bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex gap-5 items-center">
              <div className="image bg-[#FFF4D6] w-18 h-18 rounded-2xl flex justify-center items-center">
                <img src={cupcakeIcon} className="w-10 h-10" />
              </div>
              <div>
                <p className="text-xl font-medium">Top Product</p>
                <p className="text-2xl font-bold">{topProduct}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1 flex gap-8">
            <div className="flex-1 h-full bg-[#FFFFF7] border border-[#00000055] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-6 rounded-xl flex flex-col gap-5">
              <h2 className="text-xl font-medium">Lowest Stock Products</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lowestStockProducts} margin={{ right: 40 }}>
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
              <h2 className="text-xl font-medium">Revenue (Last 7 Days)</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#F8B838" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
