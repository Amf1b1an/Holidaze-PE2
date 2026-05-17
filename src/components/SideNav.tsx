import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuContext";

export default function SideNav() {
  const { isOpen, closeMenu } = useMenu();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedManager = localStorage.getItem("isManager");
  const isManager =
    storedManager && storedManager !== "undefined"
      ? JSON.parse(storedManager)
      : false;
  const handleLogout = () => {
    localStorage.clear();
    closeMenu();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      <nav
        className={`fixed top-0 left-0 h-full w-[80vw] md:w-[450px] bg-[#FFF04D] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-24 px-10 flex flex-col text-[#007878] text-xl font-semibold gap-8">
          <Link to="/" onClick={closeMenu} className="text-3xl font-bold mb-4">
            HOME
          </Link>

          {!token ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs tracking-widest opacity-70 uppercase">
                  Explore
                </h3>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="hover:translate-x-2 transition-transform"
                >
                  BROWSE VENUES
                </Link>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMenu();
                  }}
                  className="w-full py-3 border-2 border-[#007878] rounded-xl font-bold hover:bg-[#007878] hover:text-[#FFF04D] transition-all"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    closeMenu();
                  }}
                  className="w-full py-3 bg-[#007878] text-[#FFF04D] rounded-xl font-bold shadow-md hover:bg-[#005a5a] transition-all"
                >
                  REGISTER
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <h3 className="text-xs tracking-widest opacity-70">
                  MY ACCOUNT
                </h3>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="hover:translate-x-2 transition-transform"
                >
                  PROFILE
                </Link>
                <Link
                  to="/my-bookings"
                  onClick={closeMenu}
                  className="hover:translate-x-2 transition-transform"
                >
                  MY BOOKINGS
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xs tracking-widest opacity-70">VENUES</h3>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="hover:translate-x-2 transition-transform"
                >
                  BROWSE VENUES
                </Link>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="hover:translate-x-2 transition-transform"
                >
                  WATCHLIST
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xs tracking-widest opacity-70 uppercase">
                  Venue Management
                </h3>

                {isManager ? (
                  <>
                    <Link
                      to="/my-venues"
                      onClick={closeMenu}
                      className="hover:translate-x-2 transition-transform"
                    >
                      MY VENUES
                    </Link>
                    <Link
                      to="/venue-bookings"
                      onClick={closeMenu}
                      className="hover:translate-x-2 transition-transform"
                    >
                      BOOKING OVERVIEW
                    </Link>
                    <Link
                      to="/create-venue"
                      onClick={closeMenu}
                      className="bg-[#007878] text-[#FFF04D] py-2 px-4 rounded-lg mt-2 text-center hover:bg-[#005a5a] transition-all"
                    >
                      SUBMIT NEW VENUE
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/apply-manager"
                    onClick={closeMenu}
                    className="bg-[#007878] text-[#FFF04D] py-2 px-4 rounded-lg mt-2 text-center hover:scale-105 transition-all"
                  >
                    Apply for Venue Manager
                  </Link>
                )}
              </div>

              <hr className="border-[#007878]/20 mt-4" />

              <button
                onClick={handleLogout}
                className="text-left text-[#FF544E] font-bold hover:scale-105 transition-transform"
              >
                LOGOUT
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
/*Added token check, and a manager check on top of that in order to have a specialized menu depending on the account type*/
