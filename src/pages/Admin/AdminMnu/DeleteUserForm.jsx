import { useState } from "react";
import axios from "axios";

export default function DeleteUserForm() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/user/deleteuser/${email}`,
        {
          headers: {
            Accept: "application/vnd.api+json",
          },
        }
      );
      if (response.data.status) {
        alert("User deleted successfully");
      } else {
        alert("Error deleting user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Delete User Account</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete User
        </button>
      </form>
    </div>
  );
}
