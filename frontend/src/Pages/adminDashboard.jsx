import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
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
  const [loadingItems, setLoadingItems] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const headers = { email: user?.email }; // admin email for middleware check

  // Fetch users
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/users", { headers });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/items", { headers });
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchUsers();
    fetchItems();
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/items",
        { ...formData, email: user.email }
      );
      setMessage(res.data.message);
      setFormData({ name: "", brand: "", price: "", description: "", stock: "", imageUrl: "" });
      // Refresh items list
      const itemsRes = await axios.get("http://localhost:3000/api/admin/items", { headers });
      setItems(itemsRes.data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error adding item");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, { data: { email: user.email } });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/items/${itemId}`, { data: { email: user.email } });
      setItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch (err) {
      console.error(err);
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
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required className="border p-2 rounded bg-white"/>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="border p-2 rounded bg-white"/>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="border p-2 rounded bg-white"/>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded bg-white"/>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded col-span-2 bg-white"/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-2 bg-white"/>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2 transition">Add Item</button>
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
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
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.role}</td>
                    <td className="border p-2">
                      <button onClick={() => handleDeleteUser(u._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Items Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Items List</h2>
          {loadingItems ? (
            <p>Loading items...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Brand</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Stock</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i._id}>
                    <td className="border p-2">{i.name}</td>
                    <td className="border p-2">{i.brand}</td>
                    <td className="border p-2">${i.price}</td>
                    <td className="border p-2">{i.stock}</td>
                    <td className="border p-2">
                      <button onClick={() => handleDeleteItem(i._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboardPage;
