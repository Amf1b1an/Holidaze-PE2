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
        className={`fixed top-0 left-0 h-full w-[80vw] md:w-[450px] bg-[#FFF04D] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-24 px-10 flex flex-col text-[#007878] text-xl font-semibold gap-10">
          <Link to="/" onClick={closeMenu} className="text-3xl font-bold mb-4">
            HOME
          </Link>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs tracking-widest opacity-70">MY ACCOUNT</h3>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="hover:translate-x-2 transition-transform"
            >
              Profile
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs tracking-widest opacity-70">VENUES</h3>
            <Link
              to="/bookings"
              onClick={closeMenu}
              className="hover:translate-x-2 transition-transform"
            >
              My Bookings
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs tracking-widest opacity-70">
              VENUE MANAGER
            </h3>
            <Link
              to="/manage-venues"
              onClick={closeMenu}
              className="hover:translate-x-2 transition-transform"
            >
              Dashboard
            </Link>
          </div>

          <hr className="border-[#007878]/20 mt-4" />

          <button className="text-left text-[#FF544E] font-bold hover:scale-105 transition-transform">
            LOGOUT
          </button>
        </div>
      </nav>
    </>
  );
}

/* Responsiveness, as well as worked more on the design so that it is closer to the figma design. Still some more design work to do on the open menu logic on smaller screens*/
