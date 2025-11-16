import DashboardContent from "../components/layout/DashboardContent";
import Sidebar from "../components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <div className="w-[20%] min-w-[380px]">
        <Sidebar />
      </div>
      <DashboardContent />
    </div>
  );
}
