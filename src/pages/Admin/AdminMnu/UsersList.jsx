import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/allusers",
          {
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        );
        const sortedUsers = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="max-w-container mx-auto px-4">
      {error && (
        <div className="max-w-[500px] p-4 mb-4 bg-red-100 text-red-700 border border-red-400 rounded mx-auto">
          {error}
        </div>
      )}

      {filteredUsers.length > 0 ? (
        <>
          {" "}
          <div className="mb-6 flex items-center">
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          <div className="pb-20">
            <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-6 place-content-center px-6 text-lg font-titleFont font-semibold">
              <h2 className="flex justify-center items-center col-span-1">
                ID
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Name
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Email
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Phone
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Address
              </h2>
              <h2 className="flex justify-center items-center col-span-1">
                Status
              </h2>
            </div>
            <div className="mt-5">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-full grid grid-cols-6 mb-4 border border-gray-300 rounded-lg shadow-sm py-4 px-6 bg-white"
                >
                  <div className="flex justify-center items-center col-span-1">
                    {user.id}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {user.name}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {user.email}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {user.phone_number}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {user.address}
                  </div>
                  <div className="flex justify-center items-center col-span-1">
                    {user.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-[500px] p-6 py-10 bg-white flex flex-col items-center rounded-md mx-auto mt-20">
          <h1 className="font-titleFont text-xl font-bold uppercase">
            No Users Found!
          </h1>
          <p className="text-sm text-center px-10 mt-4">
            It seems there are no users yet.
          </p>
        </div>
      )}
    </div>
  );
}
