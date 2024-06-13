import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [orderResponse, setOrderResponse] = useState({ data: [] });
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State to keep track of selected order ID

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.api+json",
            },
          }
        );

        const user = response.data.user;
        setUser(user);
        setName(user.name || "");
        setEmail(user.email || "");
        setPhoneNumber(user.phone_number || "");
        setAddress(user.address || "");

        const orderResponse = await axios.get(
          `http://127.0.0.1:8000/api/user/order/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.api+json",
            },
          }
        );

        setOrderResponse(orderResponse);
        console.log("User Order:", orderResponse.data);
      } catch (error) {
        console.error("Error fetching user or order:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/user/updateuser/${user.id}`,
        { name, email, phone_number: phoneNumber, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      setUser(response.data.user);
      setSuccessMsg("Profile updated successfully.");
      setErrors({});
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Failed to update profile." });
      }
    }
  };

  const toggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "1":
        return "pending";
      case "2":
        return "shipped";
        case "3":
        return "delivered";
      default:
        return "error";
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      {errors.general && (
        <div className="max-w-[500px] p-4 mb-4 bg-red-100 text-red-700 border border-red-400 rounded mx-auto">
          {errors.general}
        </div>
      )}

      {user ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="flex flex-col mb-4">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border rounded"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.join(", ")}</p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.join(", ")}</p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="px-4 py-2 border rounded"
              />
              {errors.phone_number && (
                <p className="text-red-500">{errors.phone_number.join(", ")}</p>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-4 py-2 border rounded"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.join(", ")}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>

          {orderResponse.data.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Orders</h2>
              <div className="w-full bg-gray-100 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
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
                    {orderResponse.data.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{order.order_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusText(order.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.delivery_address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <button
                            onClick={() => toggleOrderDetails(order.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {selectedOrderId === order.id ? "Hide Details" : "Show Details"}
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
                                      <td className="px-6 py-4 whitespace-nowrap">{detail.product.name}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">{detail.quantity}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">{detail.product.price}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">{detail.product.price * detail.quantity}</td>
                                    </tr>
                                  ))}
                                  <tr className="bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold" colSpan="3">
                                      Total Price:
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                                      {order.order_details.reduce((total, detail) => total + (detail.product.price * detail.quantity), 0)}
                                    </td>
                                  </tr>
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
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
