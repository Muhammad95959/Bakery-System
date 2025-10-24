import { Link } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: string;
  label: string;
  active?: boolean;
}

export function SidebarLink({ to, icon, label, active }: SidebarLinkProps) {
  const iconColorClass = active
    ? "filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(124deg)_brightness(104%)_contrast(101%)]"
    : "";
  const textColorClass = active ? "text-white" : "text-[#F7E9B2]";
  const liClass = active ? "p-1.5 rounded-[10px] cursor-pointer bg-[#F99333]" : "p-1.5 rounded-[10px] cursor-pointer";

  return (
    <li className={liClass}>
      <Link to={to} className="flex gap-3 items-center">
        <div className="w-9 flex justify-center">
          <img src={icon} className={iconColorClass} alt={`${label} icon`} />
        </div>
        <p className={`text-[24px] font-['Nunito'] ${textColorClass}`}>{label}</p>
      </Link>
    </li>
  );
}
