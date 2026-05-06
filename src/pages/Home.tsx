import { useEffect, useState } from "react";
import type { Venue } from "../types";
import { apiRequest } from "../utils/api";
import { VenueCard } from "../components/VenueCard";
import Hamburger from "../components/Hamburger";
import SideNav from "../components/SideNav";

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <header className="mb-12 mt-24 text-center flex gap-28 flex-row justify-between">
        <div className="flex flex-col justify-start">
          <Hamburger />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-semibold text-[#FFF04D] tracking-[6.40px] md:[text-shadow:_3px_5px_0px_rgb(0_0_0_/_0.25)] [text-shadow:_2px_3px_0px_rgb(0_0_0_/_0.25)] text-shadow:_ mb-4">
            HOLIDAZE
          </h1>
          <h2 className="text-[#FFF04D] text-3xl md:text-4xl font-semibold tracking-[4px] [text-shadow:_2px_2px_0px_rgb(0_0_0_/_0.25)] text-shadow:_">
            BOOK YOUR <br></br> HOLIDAY NOW
          </h2>
        </div>
        <div>
          <p>#</p>
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
