import { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Product(productInfo) {
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const productItem = productInfo;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!token;

  const handleProductDetails = () => {
    navigate(`/product/${productItem._id}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleWishList = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to your wishlist");
      navigate("/signin");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("customer_id", user.id);
      formData.append("product_id", productInfo.id);

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
      setWishList([...wishList, productInfo]);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to your cart");
      navigate("/signin");
      return;
    }

    try {
      // Step 1: Create Order to get order_id
      const createOrderResponse = await axios.post(
        "http://127.0.0.1:8000/api/order/create",
        {
          // delivery_address: "nablus",
          // customer_id: user.id, // Use the user ID from localStorage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      const orderId = createOrderResponse.data.order_id;

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

      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  return (
    <div className="w-full relative group shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="max-w-80 max-h-80 relative overflow-hidden rounded-lg">
        <div onClick={handleProductDetails} className="cursor-pointer">
          <Image
            className="w-full h-full object-cover"
            imgSrc={productInfo.image_url}
          />
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700 p-2 rounded-b-lg flex flex-col items-end justify-center">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-between px-4 py-2 mb-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 duration-300"
          >
            Add to Cart
            <FaShoppingCart />
          </button>
          <button
            onClick={handleProductDetails}
            className="w-full flex items-center justify-between px-4 py-2 mb-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 duration-300"
          >
            View Details
            <MdOutlineLabelImportant />
          </button>
          <button
            onClick={handleWishList}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 duration-300"
          >
            Add to Wish List
            <BsSuitHeartFill />
          </button>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4 rounded-b-lg bg-white">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {productInfo.name}
          </h2>
          <p className="text-[#767676] text-[14px]">₪{productInfo.price}</p>
        </div>
      </div>
    </div>
  );
}
