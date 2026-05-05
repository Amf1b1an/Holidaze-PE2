import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { type Venue } from "../types";

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVenue = async () => {
      try {
        setLoading(true);
        const data = await apiRequest<Venue>(
          `/holidaze/venues/${id}?_owner=true&_bookings=true`,
        );
        setVenue(data);
      } catch (err: any) {
        setError(err.message || "Could not load venue.");
      } finally {
        setLoading(false);
      }
    };

    if (id) getVenue();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-red-50 text-red-700 rounded-lg text-center">
        <p className="font-bold">Error: {error || "Venue not found"}</p>
        <button onClick={() => navigate("/")} className="mt-4 underline">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <span>←</span> Back to Explore
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-200 aspect-video">
            <img
              src={venue.media[0]?.url || "https://via.placeholder.com/800x450"}
              alt={venue.media[0]?.alt || venue.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-gray-900"></h1>
            <p className="text-lg text-gray-500 mt-2">
              {venue.location.city}, {venue.location.country}
            </p>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">About this venue</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {venue.description}
            </p>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`flex items-center gap-3 ${!venue.meta.wifi && "text-gray-400 line-through"}`}
              >
                <span>#</span> {venue.meta.wifi ? "Fast Wifi" : "No Wifi"}
              </div>
              <div
                className={`flex items-center gap-3 ${!venue.meta.parking && "text-gray-400 line-through"}`}
              >
                <span>#</span>{" "}
                {venue.meta.parking ? "Free Parking" : "No Parking"}
              </div>
              <div
                className={`flex items-center gap-3 ${!venue.meta.breakfast && "text-gray-400 line-through"}`}
              >
                <span>#</span>{" "}
                {venue.meta.breakfast ? "Breakfast Included" : "No Breakfast"}
              </div>
              <div
                className={`flex items-center gap-3 ${!venue.meta.pets && "text-gray-400 line-through"}`}
              >
                <span>#</span> {venue.meta.pets ? "Pets Allowed" : "No Pets"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-2xl p-6 shadow-xl bg-white sticky top-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-3xl font-bold">${venue.price}</span>
                <span className="text-gray-500"> / night</span>
              </div>
              <div className="text-sm font-semibold">
                {venue.rating || "New"}
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <label className="block text-[10px] font-bold uppercase text-gray-500">
                  Guests
                </label>
                <p>{venue.maxGuests} Guests Max</p>
              </div>

              {/* PLACEHOLDER FOR CALENDAR COMPONENT */}
              <div className="h-64 bg-gray-50 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 text-center p-4">
                Booking Calendar <br /> (Integration Coming Soon)
              </div>

              <button
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-transform active:scale-[0.98]"
                onClick={() => alert("Please log in to book!")}
              >
                Check Availability
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              You won't be charged yet
            </p>
          </div>

          {venue.owner && (
            <div className="border rounded-2xl p-6 bg-white flex items-center gap-4">
              <img
                src={venue.owner.avatar.url}
                alt={venue.owner.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">Hosted by</p>
                <p className="font-bold">{venue.owner.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
