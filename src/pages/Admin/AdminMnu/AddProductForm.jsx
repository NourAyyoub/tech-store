import { useState } from "react";
import axios from "axios";
import InputField from "../InputField";

export default function AddProductForm() {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
    manufacturer_name: "",
    remaining_quantity: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({
        ...product,
        image: files[0],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Product added successfully");
      } else {
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Add new product</h1>
        <InputField
          label="ID"
          type="text"
          name="id"
          value={product.id}
          onChange={handleChange}
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
