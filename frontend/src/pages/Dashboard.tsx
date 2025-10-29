import Sidebar from "../components/layout/Sidebar";

function Dashboard() {
  return (
    <div className="flex">
      <div className="w-[20%] min-w-[380px]">
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
