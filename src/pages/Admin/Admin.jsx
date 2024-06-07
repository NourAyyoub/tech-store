import { useState } from "react";
import Sidebar from "./AdminMnu/Sidebar";
import AddProductForm from "./AdminMnu/AddProductForm";
import DeleteUserForm from "./AdminMnu/DeleteUserForm";
import OrdersList from "./AdminMnu/OrdersList";

export default function Admin() {
  const [currentForm, setCurrentForm] = useState("viewOrders");

  const handleShowForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="flex">
      <Sidebar onShowForm={handleShowForm} />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {currentForm === "viewOrders" && <OrdersList />}
        {currentForm === "addProduct" && <AddProductForm />}
        {currentForm === "deleteUser" && <DeleteUserForm />}
      </div>
    </div>
  );
}
