import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDetails({ orderId }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orderdetails/all/${orderId}`,
          {
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        );
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (error) {
    return (
      <div className="max-w-[500px] p-4 mb-4 bg-red-100 text-red-700 border border-red-400 rounded mx-auto">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-[500px] p-6 py-10 bg-white flex flex-col items-center rounded-md mx-auto mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">
        Order Details (ID: {order.id})
      </h1>
      <div className="mb-6">
        <p>
          <strong>Order Date:</strong> {order.order_date}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Delivery Address:</strong> {order.delivery_address}
        </p>
        <p>
          <strong>Total Price:</strong> ₪{order.total_price_for_order}
        </p>
      </div>
      <div className="pb-20">
        <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-10 place-content-center px-6 text-lg font-titleFont font-semibold">
          <h2 className="col-span-2">Product</h2>
          <h2 className="col-span-2">Category</h2>
          <h2 className="col-span-1">Price</h2>
          <h2 className="col-span-1">Quantity</h2>
          <h2 className="col-span-2">Description</h2>
          <h2 className="col-span-2">Sub Total</h2>
        </div>
        <div className="mt-5">
          {order.order_details.map((item, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-10 mb-4 border border-gray-300 rounded-lg shadow-sm py-4 px-6 bg-white"
            >
              <div className="col-span-2 flex items-center gap-4">
                <img
                  className="w-24 h-24 object-cover rounded-md"
                  src={`path/to/images/${item.product.id}.jpg`}
                  alt="productImage"
                />
                <h1 className="font-titleFont font-semibold text-lg">
                  {item.product.name}
                </h1>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                {item.product.category}
              </div>
              <div className="col-span-1 flex items-center justify-center">
                ₪{item.product.price.toFixed(2)}
              </div>
              <div className="col-span-1 flex items-center justify-center">
                {item.quantity}
              </div>
              <div className="col-span-2 flex items-center justify-center">
                {item.product.description}
              </div>
              <div className="col-span-2 flex items-center justify-end font-titleFont font-bold text-lg text-gray-800">
                ₪{item.product.total_price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
