import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDetails({ orderId, onClose }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orderdetails/all/${orderId}`, {
          headers: {
            Accept: "application/vnd.api+json",
          },
        });
        setOrderDetails(response.data.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details. Please try again.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (error) {
    return (
      <div className="p-4 mb-4 bg-red-100 text-red-700 border border-red-400 rounded">
        {error}
      </div>
    );
  }

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">Order Details</h2>
      <p className="mb-2">Order ID: {orderDetails.id}</p>
      <p className="mb-2">Order Date: {orderDetails.order_date}</p>
      <p className="mb-2">Delivery Address: {orderDetails.delivery_address}</p>
      <p className="mb-2">Total Price for Order: {orderDetails.total_price_for_order}</p>
      <h3 className="font-semibold mb-2">Products:</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Product ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Total Price for Product</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.order_details.map((detail, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{detail.product.id}</td>
              <td className="py-2 px-4 border">{detail.product.name}</td>
              <td className="py-2 px-4 border">{detail.product.price}</td>
              <td className="py-2 px-4 border">{detail.quantity}</td>
              <td className="py-2 px-4 border">{detail.product.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-gray-500 text-white py-2 px-4 rounded mt-4" onClick={onClose}>
        Close Details
      </button>
    </div>
  );
}


