import { useState } from "react";
import Sidebar from "./Sidebar";
import AddProductForm from "./AddProductForm";

export default function Admin() {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleShowAddProduct = () => {
    setShowAddProduct(true);
  };

  return (
    <div className="flex">
      <Sidebar onShowAddProduct={handleShowAddProduct} />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {showAddProduct && <AddProductForm />}
      </div>
    </div>
  );
}
