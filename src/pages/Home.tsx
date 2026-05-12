import { useEffect, useState } from "react";
import type { Venue } from "../types";
import { apiRequest } from "../utils/api";
import { VenueCard } from "../components/VenueCard";
import { getProfile } from "../api/profiles";
import Layout from "../components/layout";

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    if (token && username) {
      getProfile(username)
        .then((data) => {
          const rawValue = localStorage.getItem("isManager");
          const localStatus =
            rawValue && rawValue !== "undefined" ? JSON.parse(rawValue) : false;

          if (data.venueManager !== localStatus) {
            console.log("Background sync: Updating manager status...");
            localStorage.setItem(
              "isManager",
              JSON.stringify(data.venueManager),
            );
            window.location.reload();
          }
        })
        .catch((err) => console.error("Silent sync failed:", err));
    }
  }, [username, token]);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center md:justify-start gap-8 w-full">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </Layout>
  );
}
/*Worked on the responsiveness, namely padding and textsize as well as the shadowing on the text*/
