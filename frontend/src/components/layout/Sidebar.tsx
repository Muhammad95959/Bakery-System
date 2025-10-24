import bakeryLogo from "../../assets/bakery-logo.png";
import dashboardIcon from "../../assets/icon-dashboard.png";
import customerIcon from "../../assets/icon-customer.png";
import productsIcon from "../../assets/icon-products.png";
import ordersIcon from "../../assets/icon-orders.png";
import reportsIcon from "../../assets/icon-reports.png";
import manageStaffIcon from "../../assets/icon-manage-staff.png";
import logoutIcon from "../../assets/icon-logout.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-[#6B3D24] flex flex-col items-center h-screen">
      <img src={bakeryLogo} className="w-[280px] h-[280px]" />
      <ul className="flex flex-col gap-7.5 w-[60%]">
        <li className="p-1.5 bg-[#F99333] rounded-[10px]">
          <Link to="/dashboard" className="flex gap-3 items-center">
            <div className="w-9 flex justify-center">
              <img
                src={dashboardIcon}
                className="filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(124deg)_brightness(104%)_contrast(101%)]"
              />
            </div>
            <p className="text-[24px] text-white">Dashboard</p>
          </Link>
        </li>
        <li className="p-1.5 rounded-[10px]">
          <Link to="/customer" className="flex gap-3 items-center">
            <div className="w-9 flex justify-center">
              <img src={customerIcon} />
            </div>
            <p className="text-[24px] text-[#F7E9B2]">Customer</p>
          </Link>
        </li>
        <li className="p-1.5 rounded-[10px]">
          <Link to="/products" className="flex gap-3 items-center">
            <div className="w-9 flex justify-center">
              <img src={productsIcon} />
            </div>
            <p className="text-[24px] text-[#F7E9B2]">Products</p>
          </Link>
        </li>
        <li className="p-1.5 rounded-[10px]">
          <Link to="/orders" className="flex gap-3 items-center">
            <div className="w-9 flex justify-center">
              <img src={ordersIcon} />
            </div>
            <p className="text-[24px] text-[#F7E9B2]">Orders</p>
          </Link>
        </li>
        <li className="p-1.5 rounded-[10px]">
          <Link to="/reports" className="flex gap-3 items-center">
            <div className="w-9 flex justify-center">
              <img src={reportsIcon} />
            </div>
            <p className="text-[24px] text-[#F7E9B2]">Reports</p>
          </Link>
        </li>
        <li className="p-1.5 rounded-[10px]">
          <Link to="/manage-staff" className="flex gap-3 items-center">
            <div className="w-9 flex justify-center">
              <img src={manageStaffIcon} />
            </div>
            <p className="text-[24px] text-[#F7E9B2]">Manage Staff</p>
          </Link>
        </li>
      </ul>
      <button className="flex gap-1 justify-center mt-20 items-center bg-[#FF7C00] p-1.5 rounded-[10px] w-[60%]">
        <p className="text-[24px] text-[#F7E9B2]">Logout</p>
        <div className="w-9 flex justify-center">
          <img src={logoutIcon} />
        </div>
      </button>
    </div>
  );
}
