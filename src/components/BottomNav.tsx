import { Link, useLocation } from "react-router-dom";
import { Home, User, Calendar } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-[#007878]" : "text-slate-500";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFF04D] border-t-2 border-[#FF8800] h-16 flex items-center justify-around z-50 md:hidden">
      <Link to="/" className={`flex flex-col items-center ${isActive("/")}`}>
        <Home size={20} />
        <span className="text-[10px] font-bold">HOME</span>
      </Link>
      <Link
        to="/profile"
        className={`flex flex-col items-center ${isActive("/profile")}`}
      >
        <User size={20} />
        <span className="text-[10px] font-bold">PROFILE</span>
      </Link>
      <Link
        to="/bookings"
        className={`flex flex-col items-center ${isActive("/bookings")}`}
      >
        <Calendar size={20} />
        <span className="text-[10px] font-bold">BOOKINGS</span>
      </Link>
      <button className="flex flex-col items-center text-[#FF544E]">
        <span className="text-[10px] font-bold">LOGOUT</span>
      </button>
    </nav>
  );
}

/* used icons from lucide-react to create a bottom nav bar for mobile, instead of having the menu and profile button with the title*/
