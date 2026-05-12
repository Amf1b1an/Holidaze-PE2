import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import Home from "./pages/Home";
import SideNav from "./components/SideNav";
import VenueDetail from "./pages/VenueDetails";
import BottomNav from "./components/BottomNav";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ApplyManager from "./pages/ApplyManager";

function App() {
  return (
    <Router>
      <MenuProvider>
        <SideNav />
        <div className="min-h-screen w-full bg-gradient-to-b from-[#87FFFF] to-[#007878] flex flex-col items-center overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venue/:id" element={<VenueDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/apply-manager" element={<ApplyManager />} />
          </Routes>
        </div>
        <BottomNav />
      </MenuProvider>
    </Router>
  );
}

export default App;

/* 
added register, login routing, ApplyManager

*/
