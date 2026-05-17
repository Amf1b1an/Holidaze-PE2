import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings, type UserBooking } from "../api/bookings";
import Layout from "../components/Layout";
import ImageProcessing from "../components/ImageProcessing";
import { format, differenceInDays } from "date-fns";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const profileName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !profileName) {
      setError("You must be logged in to view your bookings.");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getUserBookings(profileName);
        setBookings(data);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [profileName, token]);

  if (loading) {
    return (
      <Layout subtitle="My Bookings">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout subtitle="Error">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 text-red-700 rounded-lg text-center">
          <p className="font-bold">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout subtitle="Your booked holidays">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8 text-[#FFF04D]"></h1>

        {bookings.length === 0 ? (
          <div className="text-center p-12 bg-[#FFC17A] border-2 border-dashed border-[#FF8800] rounded-2xl">
            <p className="text-xl font-semibold text-gray-700 mb-4">
              You haven't booked any trips yet!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Explore Venues
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const start = new Date(booking.dateFrom);
              const end = new Date(booking.dateTo);
              const totalNights = differenceInDays(end, start);

              return (
                <div
                  key={booking.id}
                  className=" pt-5 rounded-b-2xl border-t-2 border-[#FF8800] shadow-xl overflow-hidden flex flex-col md:flex-row transition-transform hover:scale-[1.01]"
                >
                  <div className="w-full md:w-1/3 min-h-[200px] relative ">
                    <ImageProcessing
                      src={
                        booking.venue?.media?.[0]?.url ||
                        "https://placehold.co/600x400"
                      }
                      alt={booking.venue?.name || "Venue Image"}
                      className="w-full h-full object-cover aspect-video md:aspect-auto rounded-2xl"
                    />
                    <div className="absolute top-3 left-3 bg-[#007878] text-white px-3 py-1 text-xs font-bold rounded-full shadow">
                      {booking.venue?.location?.city || "Unknown Location"}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h2
                          className="text-2xl font-bold text-gray-900 hover:underline cursor-pointer"
                          onClick={() => navigate(`/venue/${booking.venue.id}`)}
                        ></h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 bg-[#007878] border border-[#FF8800] rounded-xl p-4">
                        <div>
                          <p className="text-xs uppercase font-bold text-[#FFF04D]">
                            Check-In
                          </p>
                          <p className="font-semibold text-gray-800">
                            {format(start, "PPP")}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold text-[#FFF04D]">
                            Check-Out
                          </p>
                          <p className="font-semibold text-gray-800">
                            {format(end, "PPP")}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold text-[#FFF04D]">
                            Duration
                          </p>
                          <p className="font-semibold text-gray-800">
                            {totalNights}{" "}
                            {totalNights === 1 ? "Night" : "Nights"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold text-[#FFF04D]">
                            Guests
                          </p>
                          <p className="font-semibold text-gray-800">
                            {booking.guests}{" "}
                            {booking.guests === 1 ? "Guest" : "Guests"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#FF8800] mt-4">
                      <div>
                        <span className="text-xs text-[#FFF04D] uppercase block">
                          Total Price PAID
                        </span>
                        <span className="text-2xl font-black text-[#46E08C]">
                          ${(booking.venue?.price || 0) * totalNights}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`/venue/${booking.venue.id}`)}
                        className="bg-[#FFF04D] text-[#007878] px-4 py-2 rounded-lg font-black text-s hover:bg-[#FFC17B] transition-transform"
                      >
                        View Property
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
