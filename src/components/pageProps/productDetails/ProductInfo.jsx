import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

ProductInfo.propTypes = {
  productInfo: PropTypes.object,
};

export default function ProductInfo({ productInfo }) {
  const highlightStyle = {
    color: "#d0121a",
    fontWeight: "bold",
  };

  const renderDescription = () => {
    if (!productInfo.des) {
      return null;
    }

    const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <>{description}</>;
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Create Order to get order_id
      const createOrderResponse = await axios.post(
        "http://127.0.0.1:8000/api/order/create",
        {
          delivery_address: "nablus",
          customer_id: 1, // Replace with actual customer ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      const orderId = createOrderResponse.data.user[0].id;

      // Step 2: Add product to the created order
      await axios.post(
        "http://127.0.0.1:8000/api/orderdetails/create",
        {
          order_id: orderId,
          product_id: productInfo.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      setLoading(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add product to cart.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 overflow-hidden">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-2xl font-semibold">{productInfo.price}₪</p>
      <hr />
      <p className="text-base text-gray-600">{renderDescription()}</p>
      <p className="text-base text-green-600 font-medium">En Stock</p>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
