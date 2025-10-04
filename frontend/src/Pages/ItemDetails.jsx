import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function ItemDetailPage() {
  const { id } = useParams(); // Get item ID from URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user info

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
        setMessage("Error fetching item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Handle adding item to cart
  const handleAddToCart = async () => {
    if (!user) {
      setMessage("Please login to add items to your cart.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/carts", {
        userId: user.id,
        itemId: id,
        quantity: 1, // default quantity = 1
      });
      setMessage(res.data.message || "Item added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage(err.response?.data?.message || "Error adding item to cart");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>;

  if (!item)
    return <p className="text-center mt-20 text-lg text-red-600">Item not found</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="flex-1">
            <img
              src={item.imageUrl || "https://via.placeholder.com/600x400"}
              alt={item.name}
              className="w-full h-96 object-cover rounded-xl border border-gray-200"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {item.name}
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Brand:</span> {item.brand || "N/A"}
              </p>
              <p className="text-2xl font-semibold text-blue-600 mb-4">
                ${item.price}
              </p>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Stock:</span>{" "}
                {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
              {message && <p className="text-green-600">{message}</p>}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ItemDetailPage;
