import ReportsContent from "../components/layout/ReportsContent";
import Sidebar from "../components/layout/Sidebar";

function Reports() {
  return (
    <div className="flex">
      <div className="w-[20%] min-w-[380px]">
        <Sidebar />
      </div>
      <ReportsContent />
    </div>
  );
}

export default Reports;
