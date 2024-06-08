export default function Sidebar({ onShowForm }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-64 bg-white text-gray-800 shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3),5px_0_5px_-5px_rgba(0,0,0,0.3)] flex flex-col flex-grow">
        <h2 className="text-xl font-bold p-4 border-b border-gray-200">
          Admin Menu
        </h2>
        <button
          onClick={() => onShowForm("viewOrders")}
          className="p-4 hover:bg-gray-100 border-b border-gray-200 text-left"
        >
          View Orders
        </button>
        <button
          onClick={() => onShowForm("addProduct")}
          className="p-4 hover:bg-gray-100 border-b border-gray-200 text-left"
        >
          Add Product
        </button>
        <button
          onClick={() => onShowForm("deleteUser")}
          className="p-4 hover:bg-gray-100 border-b border-gray-200 text-left"
        >
          Delete User
        </button>
        <button
          onClick={() => onShowForm("editProduct")}
          className="p-4 hover:bg-gray-100 border-b border-gray-200 text-left"
        >
          Edit Product
        </button>
      </div>
    </div>
  );
}
