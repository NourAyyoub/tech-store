import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

ProductInfo.propTypes = {
  productInfo: PropTypes.object,
};

export default function ProductInfo({ productInfo }) {
  const highlightStyle = {
    color: "#d0121a",
    fontWeight: "bold",
  };
  const renderDescription = () => {
    if (!productInfo.description) {
      return null;
    }
    const description = productInfo.description
      .split(/:(.*?)-/)
      .map((part, index) => {
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
      const createOrderResponse = await axios.post(
        "http://127.0.0.1:8000/api/order/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      const orderId = createOrderResponse.data.order_id;
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

  const handleWishList = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      toast.error("Please log in to add items to your wishlist");
      navigate("/signin");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("customer_id", user.id);
      formData.append("product_id", productInfo._id);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/favorite",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 overflow-hidden">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-2xl font-semibold">{productInfo.price}₪</p>
      <hr />
      <p className="text-base text-gray-600">Product ID : {productInfo.id}</p>
      <p className="text-base text-gray-600">
        description : {renderDescription()}
      </p>
      <p
        className={`text-base font-medium ${
          productInfo.remaining_quantity > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {productInfo.remaining_quantity > 0
          ? `Remaining quantity: ${productInfo.remaining_quantity}`
          : "Out of Stock"}
      </p>
      <button
        onClick={handleAddToCart}
        className={`w-full py-4 ${
          productInfo.remaining_quantity === 0
            ? "bg-gray-400"
            : "bg-blue-500 hover:bg-blue-600"
        } duration-300 text-white text-lg font-titleFont`}
        disabled={loading || productInfo.remaining_quantity === 0}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      <button
        onClick={handleWishList}
        className="w-full py-4 bg-red-500 hover:bg-red-600 duration-300 text-white text-lg font-titleFont"
      >
        Add to Wishlist
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
