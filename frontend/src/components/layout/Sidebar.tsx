import axios from "axios";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bakeryLogo from "../../assets/bakery-logo.png";
import customerIcon from "../../assets/icon-customer.png";
import dashboardIcon from "../../assets/icon-dashboard.png";
import logoutIcon from "../../assets/icon-logout.png";
import manageStaffIcon from "../../assets/icon-manage-staff.png";
import ordersIcon from "../../assets/icon-orders.png";
import productsIcon from "../../assets/icon-products.png";
import reportsIcon from "../../assets/icon-reports.png";
import { BACKEND_URL } from "../../constants";
import { SidebarLink } from "../ui/SidebarLink";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logoutRef = useRef<HTMLButtonElement>(null);

  const links = [
    { to: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
    { to: "/customer", icon: customerIcon, label: "Customer" },
    { to: "/products", icon: productsIcon, label: "Products" },
    { to: "/orders", icon: ordersIcon, label: "Orders" },
    { to: "/reports", icon: reportsIcon, label: "Reports" },
    { to: "/manage-staff", icon: manageStaffIcon, label: "Manage Staff" },
  ];

  function logout() {
    logoutRef.current?.classList.add("animate-pulse");
    axios
      .get(`${BACKEND_URL}/auth/logout`, { withCredentials: true })
      .then(() => navigate("/login"))
      .finally(() => logoutRef.current?.classList.remove("animate-pulse"));
  }

  return (
    <div className="bg-[#6B3D24] min-h-screen h-full relative">
      <div className="sticky top-0 flex flex-col items-center">
        <img src={bakeryLogo} className="w-[280px] h-[280px]" />
        <ul className="flex flex-col gap-7.5 w-[60%]">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={pathname.startsWith(link.to)}
            />
          ))}
        </ul>
        <button
          onClick={logout}
          className="flex gap-1 justify-center mt-20 mb-10 items-center bg-[#FF7C00] p-1.5 rounded-[10px] w-[60%] cursor-pointer hover:opacity-90"
          ref={logoutRef}
        >
          <p className="text-[24px] text-[#F7E9B2]">Logout</p>
          <div className="w-9 flex justify-center">
            <img src={logoutIcon} />
          </div>
        </button>
      </div>
    </div>
  );
}
