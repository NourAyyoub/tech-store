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
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phone_number);
        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user details.");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/user/update",
        { name, email, phone_number: phoneNumber, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      setUser(response.data);
      setSuccessMsg("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded">
          {successMsg}
        </div>
      )}
      {user ? (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
