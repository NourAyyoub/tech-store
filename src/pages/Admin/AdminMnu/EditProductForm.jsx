import { useState } from "react";
import axios from "axios";
import InputField from "../InputField";

export default function EditProductForm() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/product/${productId}`,
        {
          headers: {
            Accept: "application/vnd.api+json",
          },
        }
      );
      setProduct(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to fetch product. Please check the product ID.");
      setProduct(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {
      if (key !== "image_url") {
        formData.append(key, product[key]);
      }
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/product/updateproduct/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/vnd.api+json",
          },
        }
      );
      if (response.status === 200) {
        alert("Product updated successfully");
      } else {
        alert("Error updating product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {!product ? (
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Enter Product ID</h1>
          <InputField
            label="Product ID"
            type="text"
            name="productId"
            value={productId}
            onChange={handleProductIdChange}
          />
          <button
            onClick={handleFetchProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Fetch Product
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
          <InputField
            label="ID"
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            disabled
          />
          <InputField
            label="Name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <InputField
            label="Price"
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          <InputField
            label="Category"
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
          <InputField
            label="Description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          <InputField
            label="Image"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <InputField
            label="Brand"
            type="text"
            name="manufacturer_name"
            value={product.manufacturer_name}
            onChange={handleChange}
          />
          <InputField
            label="Quantity"
            type="text"
            name="remaining_quantity"
            value={product.remaining_quantity}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Update Product
          </button>
        </form>
      )}
    </div>
  );
}
