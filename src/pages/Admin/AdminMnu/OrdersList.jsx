import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderDetails from "./OrderDetails";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders", {
          headers: {
            Accept: "application/vnd.api+json",
          },
        });
        const fetchedOrders = response.data.filter(
          (order) => order.status !== "0"
        );
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let sortedOrders = [...orders];
    if (searchId) {
      sortedOrders = sortedOrders.filter((order) =>
        order.id.toString().includes(searchId)
      );
    }
    if (sortBy === "status") {
      sortedOrders.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortBy === "date") {
      sortedOrders.sort(
        (a, b) => new Date(a.order_date) - new Date(b.order_date)
      );
    }
    setFilteredOrders(sortedOrders);
  }, [orders, searchId, sortBy]);

  const updateOrderStatus = async (orderId, status) => {
    setError(null);
    let url;
    if (status === "2") {
      url = `http://127.0.0.1:8000/api/order/statustwo/${orderId}`;
    } else if (status === "3") {
      url = `http://127.0.0.1:8000/api/order/statusthree/${orderId}`;
    } else {
      url = `http://127.0.0.1:8000/api/order/statusone/${orderId}`;
    }

    try {
      const response = await axios.put(url, null, {
        headers: {
          Accept: "application/vnd.api+json",
        },
      });
      if (response.status === 200 && response.data.order) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      } else {
        console.error("Error updating order status:", response.data.message);
        setError("Failed to update the order status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update the order status. Please try again.");
    }
  };

  const handleStatusChange = (orderId, e) => {
    const newStatus = e.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  const handleDelete = async (orderId) => {
    setError(null);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/order/deleteorder/${orderId}`,
        {
          headers: {
            Accept: "application/vnd.api+json",
          },
        }
      );
      if (response.data.status) {
        setOrders(orders.filter((order) => order.id !== orderId));
      } else {
        console.error("Error deleting order:", response.data.message);
        setError("Failed to delete the order. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Failed to delete the order. Please try again.");
    }
  };

  const pendingOrders = orders.filter((order) => order.status === "1").length;
  const shippedOrders = orders.filter((order) => order.status === "2").length;
  const deliveredOrders = orders.filter((order) => order.status === "3").length;

  return (
    <div className="max-w-container mx-auto px-4">
      {error && (
        <div className="max-w-[500px] p-4 mb-4 bg-red-100 text-red-700 border border-red-400 rounded mx-auto">
          {error}
        </div>
      )}
      {selectedOrderId && (
        <div className="mb-6">
          <OrderDetails orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
        </div>
      )}

      {filteredOrders.length > 0 ? (
        <>
          {" "}
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <p>Pending Orders: {pendingOrders}</p>
            <p>Shipped Orders: {shippedOrders}</p>
            <p>Delivered Orders: {deliveredOrders}</p>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="text"
              placeholder="Search by Order ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-4 py-2 border rounded"
            />
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              <option value="">Sort By ID</option>
              <option value="status">Sort by Status</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
          <div className="pb-20">
            <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-7 place-content-center px-6 text-lg font-titleFont font-semibold">
              <h2 className="flex justify-center items-center col-span-1">
                Order ID
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Date
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Status
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Delivery Address
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Customer ID
              </h2>
              <h2 className="flex justify-center items-center col-span-2">
                Actions
              </h2>
            </div>
            <div className="mt-5">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="w-full grid grid-cols-7 mb-4 border border-gray-300 rounded-lg shadow-sm py-4 px-6 bg-white"
                >
                  <div className="flex justify-center items-center col-span-1">
                    {order.id}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {order.order_date}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e)}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="1">Pending</option>
                      <option value="2">Shipped</option>
                      <option value="3">Delivered</option>
                    </select>
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {order.delivery_address}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {order.customer_id}
                  </div>
                  <div className="flex justify-center items-center col-span-2 gap-2">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-[500px] p-6 py-10 bg-white flex flex-col items-center rounded-md mx-auto mt-20">
          <h1 className="font-titleFont text-xl font-bold uppercase">
            No Orders Found!
          </h1>
          <p className="text-sm text-center px-10 mt-4">
            It seems there are no orders yet.
          </p>
        </div>
      )}
    </div>
  );
}

