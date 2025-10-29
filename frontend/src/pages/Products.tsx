import AddProduct from "../components/layout/Products/AddProducut";
import EditProduct from "../components/layout/Products/EditProduct";
import ListProducts from "../components/layout/Products/ListProducts";
import Sidebar from "../components/layout/Sidebar";

function Products(props: { screen: "overview" | "add" | "update" }) {
  return (
    <div className="flex">
      <div className="w-[20%] min-w-[380px]">
        <Sidebar />
      </div>
      {props.screen === "overview" && <ListProducts />}
      {props.screen === "add" && <AddProduct />}
      {props.screen === "update" && <EditProduct />}
    </div>
  );
}

export default Products;
