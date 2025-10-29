import AddStaff from "../components/layout/ManageStaff/AddStaff";
import EditStaff from "../components/layout/ManageStaff/EditStaff";
import ListStaff from "../components/layout/ManageStaff/ListStaff";
import Sidebar from "../components/layout/Sidebar";

function ManageStaff(props: { screen: "overview" | "add" | "update" }) {
  return (
    <div className="flex">
      <div className="w-[20%] min-w-[380px]">
        <Sidebar />
      </div>
      {props.screen === "overview" && <ListStaff />}
      {props.screen === "add" && <AddStaff />}
      {props.screen === "update" && <EditStaff />}
    </div>
  );
}

export default ManageStaff;
