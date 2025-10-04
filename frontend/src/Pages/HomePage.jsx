import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

function HomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/items"); // ✅ Make sure your backend runs on 5000
        console.log(res.data);
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Latest item (if exists in DB)
  const latestItem = items.length > 0 ? items[0] : {
    id: "placeholder",
    name: "Dell XPS 15",
    description: "High-performance laptop with Intel i9 processor",
    imageUrl: "https://via.placeholder.com/1200x400",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Latest Item Banner */}
      <div className="max-w-7xl mx-auto mt-6 relative">
        <Link to={`/item/${latestItem._id}`}>
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg cursor-pointer">
            <img
              src={latestItem.imageUrl || "https://via.placeholder.com/1200x400"}
              alt={latestItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-6 md:p-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {latestItem.name}
              </h2>
              <p className="text-white text-lg md:text-2xl">
                {latestItem.description}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto p-4 mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {items.length > 0 ? (
            items.map((item) => (
              <Link key={item._id} to={`/item/${item._id}`}>
                <div className="card bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition">
                  <figure className="h-48 bg-gray-100 flex justify-center items-center">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/300x200"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </figure>
                  <div className="card-body text-center">
                    <h3 className="card-title justify-center">{item.name}</h3>
                    <p className="text-gray-700 font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">Loading items...</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
