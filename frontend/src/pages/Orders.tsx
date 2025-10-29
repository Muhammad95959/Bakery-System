import AddOrder from "../components/layout/Orders/AddOrder";
import OrderDetails from "../components/layout/Orders/OrderDetails";
import OrderList from "../components/layout/Orders/OrderList";
import Sidebar from "../components/layout/Sidebar";

function Orders(props: { screen: "overview" | "add" | "details" }) {
  return (
    <div className="flex">
      <div className="basis-[20%]">
        <Sidebar />
      </div>
      {props.screen === "overview" && <OrderList />}
      {props.screen === "add" && <AddOrder />}
      {props.screen === "details" && <OrderDetails />}
    </div>
  );
}

export default Orders;
