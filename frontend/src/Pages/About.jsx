import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex-grow max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our store! We provide high-quality products and an easy-to-use online shopping experience.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to deliver exceptional value and service to our customers while continuously improving our offerings.
        </p>
        <p className="text-gray-700">
          Whether you’re browsing for the latest gadgets or searching for trusted everyday essentials, we aim to make your shopping journey simple and enjoyable.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
