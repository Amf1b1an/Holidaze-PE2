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
    <div className="mix-w-screen mx-auto px-4 py-12">
      <header className="mb-12 mt-24 text-center flex gap-14 flex-row justify-between">
        <div className="flex flex-col justify-start">
          <Hamburger />
        </div>
        <div className="flex flex-col">
          <h1 className="text-5xl font-semibold text-[#FFF04D] tracking-tighter mb-4">
            HOLIDAZE
          </h1>
          <h2 className="text-[#FFF04D] text-4xl font-semibold tracking-[4px]">
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

/*As of now i've added the 12 newest venues to be shown on the front page. I've also began to change placeholder styling with correct styling accord to 
the figma file since some of the js logic are working*/
