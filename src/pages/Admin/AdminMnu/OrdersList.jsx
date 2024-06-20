import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderDetails from "./OrderDetails";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
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
        setError("Failed to fetch orders. Please try again.");
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (searchId) {
      filtered = filtered.filter((order) =>
        order.id.toString().includes(searchId)
      );
    }
    if (searchName) {
      filtered = filtered.filter((order) =>
        order.user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchDate) {
      filtered = filtered.filter((order) =>
        order.order_date.includes(searchDate)
      );
    }
    if (searchStatus) {
      filtered = filtered.filter((order) =>
        order.status.toString() === searchStatus
      );
    }
    if (searchAddress) {
      filtered = filtered.filter((order) =>
        order.delivery_address.toLowerCase().includes(searchAddress.toLowerCase())
      );
    }

    if (sortBy === "status") {
      filtered.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortBy === "date") {
      filtered.sort(
        (a, b) => new Date(a.order_date) - new Date(b.order_date)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, searchId, searchName, searchDate, searchStatus, searchAddress, sortBy]);

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
      <div className="flex flex-col items-start mt-4 space-y-2">
        <div>
          <span className="font-semibold">Number of Pending Orders:</span>{" "}
          {pendingOrders}
        </div>
        <div>
          <span className="font-semibold">Number of Shipped Orders:</span>{" "}
          {shippedOrders}
        </div>
        <div>
          <span className="font-semibold">Number of Delivered Orders:</span>{" "}
          {deliveredOrders}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
        <input
          type="text"
          placeholder="Filter by Customer Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="mb-2 md:mb-0 px-4 py-2 border rounded"
        />
        <input
          type="date"
          placeholder="Filter by Date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="mb-2 md:mb-0 px-4 py-2 border rounded"
        />
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
          className="mb-2 md:mb-0 px-4 py-2 border rounded"
        >
          <option value="">Filter by Status</option>
          <option value="1">Pending</option>
          <option value="2">Shipped</option>
          <option value="3">Delivered</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Address"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          className="mb-2 md:mb-0 px-4 py-2 border rounded"
        />
      </div>
      {filteredOrders.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <div className="w-full bg-gray-100 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.order_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="1">Pending</option>
                        <option value="2">Shipped</option>
                        <option value="3">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.delivery_address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <button
                        onClick={() =>
                          setSelectedOrderId(
                            selectedOrderId === order.id ? null : order.id
                          )
                        }
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {selectedOrderId === order.id
                          ? "Hide Details"
                          : "Show Details"}
                      </button>
                      {selectedOrderId === order.id && (
                        <div className="mt-4 px-4 py-2 bg-gray-200">
                          <h3 className="font-semibold mb-2">Order Details</h3>
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Product Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total Price
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {order.order_details.map((detail, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detail.product.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detail.quantity}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detail.product.price}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detail.product.price * detail.quantity}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <p>No orders found.</p>
        </div>
      )}
    </div>
  );
}
