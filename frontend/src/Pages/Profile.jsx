import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function ProfilePage() {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // remove user from storage
    navigate("/"); // redirect to homepage
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          <p className="mb-2">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Role:</span> {user.role}
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;
