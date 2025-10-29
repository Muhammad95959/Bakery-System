import AddCustomer from "../components/layout/Customers/AddCustomer";
import EditCustomer from "../components/layout/Customers/EditCustomer";
import ListCustomers from "../components/layout/Customers/ListCustomers";
import Sidebar from "../components/layout/Sidebar";

function Customer(props: { screen: "overview" | "add" | "update" }) {
  return (
    <div className="flex">
      <div className="basis-[20%]">
        <Sidebar />
      </div>
      {props.screen === "overview" && <ListCustomers />}
      {props.screen === "add" && <AddCustomer />}
      {props.screen === "update" && <EditCustomer />}
    </div>
  );
}

export default Customer;
