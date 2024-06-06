import { useState } from "react";
import Sidebar from "./AdminMnu/Sidebar";
import AddProductForm from "./AdminMnu/AddProductForm";
import DeleteUserForm from "./AdminMnu/DeleteUserForm";

export default function Admin() {
  const [currentForm, setCurrentForm] = useState(null);

  const handleShowForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="flex">
      <Sidebar onShowForm={handleShowForm} />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {currentForm === "addProduct" && <AddProductForm />}
        {currentForm === "deleteUser" && <DeleteUserForm />}
      </div>
    </div>
  );
}
