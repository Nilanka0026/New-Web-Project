import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // logged-in user

  // Fetch user's cart
  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/carts/${user.id}`);
        setCart(res.data.items);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Error fetching cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // Remove item from cart
  const handleRemove = async (itemId) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/carts", {
        data: { userId: user.id, itemId },
      });
      setMessage(res.data.message);
      setCart((prev) => prev.filter((i) => i.productId._id !== itemId));
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error removing item");
    }
  };

  // Update item quantity
  const handleUpdateQuantity = async (itemId, action) => {
    try {
      const res = await axios.patch("http://localhost:3000/api/carts", {
        userId: user.id,
        itemId,
        action, // "increment" or "decrement"
      });

      setCart((prev) =>
        prev.map((i) =>
          i.productId._id === itemId ? { ...i, quantity: res.data.item.quantity } : i
        )
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error updating quantity");
    }
  };

  // Not logged in
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-600 text-lg">Please login to view your cart.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-600 text-lg">Loading cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const isEmpty = cart.length === 0;

  // Total price calculation
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-grow max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {message && <p className="text-green-600 mb-4">{message}</p>}

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center text-gray-600 py-20">
            <p className="text-lg mb-2">Your cart is empty.</p>
            <p>Add some items to see them here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Item</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Subtotal</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId._id}>
                    <td className="border p-2">{item.productId.name}</td>
                    <td className="border p-2">${item.productId.price}</td>
                    <td className="border p-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, "decrement")}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, "increment")}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </td>
                    <td className="border p-2">
                      ${item.productId.price * item.quantity}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-4 text-xl font-semibold">
              Total: ${totalPrice}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;
