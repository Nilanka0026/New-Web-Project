import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import LoginPage from "./Pages/LoginPage"; // <-- import login page
import SignupPage from "./Pages/SignupPage"; // <-- import signup page
import ItemDetailPage from "./Pages/ItemDetails";
import Profile from "./Pages/Profile"; // <-- import profile page
import AdminDashboardPage from "./Pages/adminDashboard";
import ProfilePage from "./Pages/Profile";
import CartPage from "./Pages/Cart";
import AboutPage from "./Pages/About"; 
import ContactPage from "./Pages/Contactus";


const App = () => {
  return (
    <div>
      <Routes>
        {/* Public / Auth routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main app routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
    </div>
  );
};

export default App