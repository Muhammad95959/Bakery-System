import Sidebar from "../components/layout/Sidebar";

function Dashboard() {
  return (
    <div className="flex">
      <div className="basis-[20%]">
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
