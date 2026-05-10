import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Venue } from "../types";
import { apiRequest } from "../utils/api";
import { VenueCard } from "../components/VenueCard";
import Hamburger from "../components/Hamburger";
import SideNav from "../components/SideNav";

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");

  useEffect(() => {
    async function loadVenues() {
      try {
        setLoading(true);
        const response = await apiRequest<any>("/holidaze/venues?_owner=true");

        console.log("Full API Response:", response);

        const rawData = response?.data || response;
        const allVenues = Array.isArray(rawData) ? rawData : [];
        const newestTwelve = [...allVenues]
          .sort(
            (a, b) =>
              new Date(b.created).getTime() - new Date(a.created).getTime(),
          )
          .slice(0, 12);

        setVenues(newestTwelve);
      } catch (err: any) {
        console.error("Fetch failed:", err);
        setError("Failed to load venues.");
      } finally {
        setLoading(false);
      }
    }
    loadVenues();
  }, []);

  return (
    <div className="mix-w-screen px-28 md:px-15 py-12">
      <header className="mb-12 mt-24 flex flex-row items-center justify-between w-full">
        <div className="hidden md:flex justify-start md:flex-1">
          <Hamburger />
        </div>
        <div className="flex flex-col text-center flex-grow">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-semibold text-[#FFF04D] tracking-[6.40px] md:[text-shadow:_3px_5px_0px_rgb(0_0_0_/_0.25)] [text-shadow:_2px_3px_0px_rgb(0_0_0_/_0.25)] text-shadow:_ mb-4">
            HOLIDAZE
          </h1>
          <h2 className="text-[#FFF04D] text-3xl md:text-4xl font-semibold tracking-[4px] [text-shadow:_2px_2px_0px_rgb(0_0_0_/_0.25)] text-shadow:_">
            BOOK YOUR <br></br> HOLIDAY NOW
          </h2>
        </div>
        <div className="hidden md:flex items-center md:flex-1 justify-end">
          {token ? (
            <Link
              to="/profile"
              className="p-3 rounded-full border-2 border-[#FFF04D] text-[#FFF04D] hover:bg-[#FFF04D] hover:text-[#007878] transition-all flex items-center gap-2 group"
              title={`Logged in as ${username}`}
            >
              <User size={24} />
              <span className="hidden lg:block font-bold">MY PROFILE</span>
            </Link>
          ) : (
            <div className="flex gap-4 flex-col">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-[#FFF04D] font-bold border-b-2 border-transparent hover:border-[#FFF04D] transition-all"
              >
                LOGIN
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 bg-[#FFF04D] text-[#007878] font-bold rounded-full hover:bg-white transition-all shadow-md"
              >
                REGISTER
              </button>
            </div>
          )}
        </div>
      </header>

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg text-center mb-8">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}

/*Worked on the responsiveness, namely padding and textsize as well as the shadowing on the text*/
