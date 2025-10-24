import bakeryLogo from "../../assets/bakery-logo.png";
import dashboardIcon from "../../assets/icon-dashboard.png";
import customerIcon from "../../assets/icon-customer.png";
import productsIcon from "../../assets/icon-products.png";
import ordersIcon from "../../assets/icon-orders.png";
import reportsIcon from "../../assets/icon-reports.png";
import manageStaffIcon from "../../assets/icon-manage-staff.png";
import logoutIcon from "../../assets/icon-logout.png";
import { useLocation } from "react-router-dom";
import { SidebarLink } from "../ui/SidebarLink";

export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
    { to: "/customer", icon: customerIcon, label: "Customer" },
    { to: "/products", icon: productsIcon, label: "Products" },
    { to: "/orders", icon: ordersIcon, label: "Orders" },
    { to: "/reports", icon: reportsIcon, label: "Reports" },
    { to: "/manage-staff", icon: manageStaffIcon, label: "Manage Staff" },
  ];

  return (
    <div className="bg-[#6B3D24] flex flex-col items-center h-screen">
      <img src={bakeryLogo} className="w-[280px] h-[280px]" />
      <ul className="flex flex-col gap-7.5 w-[60%]">
        {links.map((link) => (
          <SidebarLink to={link.to} icon={link.icon} label={link.label} active={pathname === link.to} />
        ))}
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
