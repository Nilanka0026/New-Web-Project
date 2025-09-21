import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Smartphone, LaptopMinimal, Watch, Headset, Laptop } from "lucide-react";

function HomePage() {
  const categories = [
    { name: "Phones", icon: <Smartphone className="w-5 h-5 mr-2" /> },
    { name: "Laptops", icon: <LaptopMinimal className="w-5 h-5 mr-2" /> },
    { name: "Smart Watches", icon: <Watch className="w-5 h-5 mr-2" /> },
    { name: "Headphones", icon: <Headset className="w-5 h-5 mr-2" /> },
  ];

  // Latest item
  const latestItem = {
    name: "Dell XPS 15",
    description: "High-performance laptop with Intel i9 processor",
    imageUrl: "https://via.placeholder.com/1200x400",
  };

  // Browse by categories cards
  const browseCategories = [
    { name: "Laptops", imageUrl: null, link: "/category/laptops" }, // Use Laptop icon
    { name: "Phones", imageUrl: "https://via.placeholder.com/400x250", link: "/category/phones" },
    { name: "Headphones", imageUrl: "https://via.placeholder.com/400x250", link: "/category/headphones" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Category Menu */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto flex justify-around">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-center flex-1 text-center py-2 rounded"
            >
              {category.icon}
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Item Banner */}
      <div className="max-w-7xl mx-auto mt-6 relative">
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <img
            src={latestItem.imageUrl}
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
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-4 mt-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to N-Tech</h1>

        {/* Browse by Categories Section */}
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Browse by Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {browseCategories.map((category) => (
            <div
              key={category.name}
              className="card bg-base-100 image-full w-full shadow-xl cursor-pointer hover:shadow-2xl transition"
              onClick={() => window.location.href = category.link}
            >
              <figure className="h-48">
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full bg-gray-200">
                    <Laptop size={72} strokeWidth={1.5} />
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">{category.name}</h2>
                <p>Explore the latest {category.name.toLowerCase()} in our collection.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* Our Products Section */}
<div className="max-w-7xl mx-auto p-4 mt-8">
  <h2 className="text-xl md:text-2xl font-semibold mb-6">Our Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
    {[
      { name: "Laptop 1", price: "$999", imageUrl: "https://via.placeholder.com/300x200" },
      { name: "Laptop 2", price: "$1199", imageUrl: "https://via.placeholder.com/300x200" },
      { name: "Phone 1", price: "$699", imageUrl: "https://via.placeholder.com/300x200" },
      { name: "Phone 2", price: "$799", imageUrl: "https://via.placeholder.com/300x200" },
      { name: "Headphones 1", price: "$199", imageUrl: "https://via.placeholder.com/300x200" },
      { name: "Headphones 2", price: "$299", imageUrl: "https://via.placeholder.com/300x200" },
      { name: "Smart Watch 1", price: "$249", imageUrl: "https://via.placeholder.com/300x200" },
      { name: "Smart Watch 2", price: "$349", imageUrl: "https://via.placeholder.com/300x200" },
    ].map((product) => (
      <div
        key={product.name}
        className="card bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition"
      >
        <figure className="h-48 bg-gray-100 flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body text-center">
          <h3 className="card-title justify-center">{product.name}</h3>
          <p className="text-gray-700 font-semibold">{product.price}</p>
        </div>
      </div>
    ))}
  </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
