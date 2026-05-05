import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuContext";

export default function SideNav() {
  const { isOpen, closeMenu } = useMenu();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      <nav
        className={`fixed top-0 left-0 h-full max-w-96 bg-slate-900 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-24 px-6 flex flex-col gap-6 text-[#FFF04D] text-xl font-semibold">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/profile" onClick={closeMenu}>
            Profile
          </Link>
          <Link to="/bookings" onClick={closeMenu}>
            My Bookings
          </Link>
          <hr className="border-slate-700" />
          <button className="text-left text-red-400">Logout</button>
        </div>
      </nav>
    </>
  );
}
