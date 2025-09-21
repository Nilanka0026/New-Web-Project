import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import LoginPage from "./Pages/LoginPage"; // <-- import login page
import SignupPage from "./Pages/SignupPage"; // <-- import signup page

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
      </Routes>
    </div>
  );
};

export default App