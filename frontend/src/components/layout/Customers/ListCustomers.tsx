import { Link } from "react-router-dom";
import searchIcon from "../../../assets/icon-search.svg";
import userIcon from "../../../assets/icon-user.svg";
import CustomerInfo from "../../ui/CustomerInfo";

export default function ListCustomers() {
  const customers = [
    { name: "John Doe", email: "test@test.com", phone: "123-456-7890", address: "123 Main St, City, Country" },
    { name: "Jane Smith", email: "test@test.com", phone: "987-654-3210", address: "456 Elm St, City, Country" },
    { name: "Alice Johnson", email: "test@test.com", phone: "555-123-4567", address: "789 Oak St, City, Country" },
    { name: "Bob Brown", email: "test@test.com", phone: "444-987-6543", address: "321 Pine St, City, Country" },
    { name: "Charlie Davis", email: "test@test.com", phone: "333-222-1111", address: "654 Maple St, City, Country" },
  ];

  return (
    <div className="p-20 basis-[80%] flex flex-col max-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-[48px] font-semibold">Customers</h1>
        <div className="image bg-[#FFF8E2] p-4 rounded-[50%]">
          <img src={userIcon} />
        </div>
      </div>
      <div className="flex gap-6 mb-10 items-center">
        <div className="p-4 relative flex-85/100 border border-[rgba(87,90,56,0.26)] rounded-md">
          <input
            type="text"
            placeholder="Search Customer"
            className="pl-14 placeholder-[rgba(107,61,36,0.9)] caret-[rgba(87,90,56,0.52)] w-full"
          />
          <img src={searchIcon} className="absolute top-1/2 left-6 -translate-y-1/2 -z-1" />
        </div>
        <Link to="/customer/add" className="flex-15/100">
          <button className="cursor-pointer bg-[#FFAC3E] p-3 text-white rounded-md hover:opacity-92 w-full">
            + Add Customer
          </button>
        </Link>
      </div>
      <div className="rounded-xl border border-[rgba(87,90,56,0.26)] overflow-y-auto min-h-0">
        <div className="flex justify-around p-4 font-semibold">
          <p className="flex-1/5 text-center">Name</p>
          <p className="flex-1/5 text-center">Email</p>
          <p className="flex-1/5 text-center">Phone</p>
          <p className="flex-1/5 text-center">Address</p>
          <p className="flex-1/5 text-center">Action</p>
        </div>
        {customers.map((customer, index) => (
          <CustomerInfo
            key={index}
            name={customer.name}
            email={customer.email}
            phone={customer.phone}
            address={customer.address}
          />
        ))}
      </div>
    </div>
  );
}
