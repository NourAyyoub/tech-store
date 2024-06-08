import { useState } from "react";
import axios from "axios";
import InputField from "../InputField";

export default function DeleteProductForm() {
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/product/deleteproduct/${productId}`,
        {
          headers: {
            Accept: "application/vnd.api+json",
          },
        }
      );
      if (response.data.status) {
        setMessage("Product deleted successfully");
        setError(null);
      } else {
        setError("Failed to delete the product. Please check the product ID.");
        setMessage(null);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete the product. Please check the product ID.");
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Delete Product</h1>
        <InputField
          label="Product ID"
          type="text"
          name="productId"
          value={productId}
          onChange={handleProductIdChange}
        />
        <button
          onClick={handleDeleteProduct}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Delete Product
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}
