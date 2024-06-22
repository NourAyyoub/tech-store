import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Payment() {
  const [shippingAddress, setShippingAddress] = useState("");
  const token = localStorage.getItem("token");

  const handleAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleOrderConfirmation = async () => {
    if (!shippingAddress) {
      toast.error("Shipping address cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/order/confirm/1",
        { delivery_address: shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      toast.success("Order confirmed successfully.");
    } catch (error) {
      console.error("Failed to confirm order:", error);
      toast.error("Failed to confirm order.");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="pb-10">
        <div className="bg-[#F5F7F7] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Confirm Your Order</h2>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="address">
              Shipping Address
            </label>
            <input
              type="text"
              id="address"
              value={shippingAddress}
              onChange={handleAddressChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your shipping address"
            />
          </div>
          <button
            onClick={handleOrderConfirmation}
            className="w-full h-12 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300"
          >
            Confirm Order
          </button>
        </div>
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
}
