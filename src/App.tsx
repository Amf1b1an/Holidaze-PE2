import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import Home from "./pages/Home";
import SideNav from "./components/SideNav";
import VenueDetail from "./pages/VenueDetails";

function App() {
  return (
    <Router>
      <MenuProvider>
        <SideNav />
        <div className="min-h-screen w-full bg-gradient-to-b from-[#87FFFF] to-[#007878] flex flex-col items-center overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venue/:id" element={<VenueDetail />} />
          </Routes>
        </div>
      </MenuProvider>
    </Router>
  );
}

export default App;

/* 
added venue id routing

*/
