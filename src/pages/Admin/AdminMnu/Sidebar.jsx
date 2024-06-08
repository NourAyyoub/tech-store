export default function Sidebar({ currentForm, onShowForm }) {
  const menuItems = [
    { name: "viewOrders", label: "View Orders" },
    { name: "addProduct", label: "Add Product" },
    { name: "deleteUser", label: "Delete User" },
    { name: "editProduct", label: "Edit Product" },
    { name: "deleteProduct", label: "Delete Product" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-64 bg-white text-gray-800 shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3),5px_0_5px_-5px_rgba(0,0,0,0.3)] flex flex-col flex-grow">
        <h2 className="text-xl font-bold p-4 border-b border-gray-200">
          Admin Menu
        </h2>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onShowForm(item.name)}
            className={`p-4 hover:bg-gray-100 border-b border-gray-200 text-left ${
              currentForm === item.name ? "bg-gray-200" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
