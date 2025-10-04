import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch users
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/users", {
          headers: { email: user.email }, // admin email for isAdmin check
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit to add new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/admin/items", {
        ...formData,
        email: user.email, // for admin check
      });
      setMessage(res.data.message);

      // Clear form
      setFormData({
        name: "",
        brand: "",
        price: "",
        description: "",
        stock: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error adding item");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <p className="text-center mt-20 text-lg text-red-600">
        Access denied. Admin only.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Add Item Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
          {message && <p className="text-green-600 mb-4">{message}</p>}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Item Name"
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="border p-2 rounded col-span-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded col-span-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2 transition"
            >
              Add Item
            </button>
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
