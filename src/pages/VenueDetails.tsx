import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { type Venue } from "../types";
import Layout from "../components/Layout";
import { DayPicker, type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { createBooking } from "../api/bookings";
import ImageProcessing from "../components/ImageProcessing";

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const token = localStorage.getItem("token");

  const bookedRanges =
    venue?.bookings?.map((booking: any) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    })) || [];

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
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !venue) {
    return (
      <Layout subtitle="Error">
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-red-50 text-red-700 rounded-lg text-center">
          <p className="font-bold">Error: {error || "Venue not found"}</p>
          <button onClick={() => navigate("/")} className="mt-4 underline">
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  const handleBooking = async () => {
    if (!token) {
      alert("Please log in to book.");
      return navigate("/login");
    }

    if (!selectedRange?.from || !selectedRange?.to) {
      alert("Please select dates.");
      return;
    }

    try {
      setIsBooking(true);

      const fromDate = new Date(selectedRange.from);
      fromDate.setHours(12, 0, 0, 0);

      const toDate = new Date(selectedRange.to);
      toDate.setHours(12, 0, 0, 0);

      const payload = {
        dateFrom: fromDate.toISOString(),
        dateTo: toDate.toISOString(),
        guests: Number(guestCount),
        venueId: venue.id,
      };

      await createBooking(payload);

      alert("Booking successful!");
      navigate("/profile");
    } catch (err: any) {
      console.error("Full API Validation Error Stack:", err);
      alert(err.message || "Booking failed");
    } finally {
      setIsBooking(false);
    }
  };

  let footer = (
    <p className="mt-4 text-sm text-gray-500">Pick the first date.</p>
  );
  if (selectedRange?.from) {
    if (!selectedRange?.to) {
      footer = (
        <p className="mt-4 text-sm font-semibold text-blue-600">
          {format(selectedRange.from, "PPP")}
        </p>
      );
    } else if (selectedRange.to) {
      footer = (
        <p className="mt-4 text-sm font-semibold text-[#007878]">
          {format(selectedRange.from, "PPP")} –{" "}
          {format(selectedRange.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <Layout subtitle={venue.name}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 space-y-4">
          <ImageProcessing
            src={venue.media[0]?.url}
            alt={venue.name}
            className="rounded-2xl aspect-video border-2 border-[#FF8800] shadow-2xl"
          />

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {venue.media.map((img, index) => (
              <ImageProcessing
                key={index}
                src={img.url}
                alt={`View ${index + 1}`}
                className="w-32 h-24 flex-shrink-0 rounded-xl border-2 border-[#007878] hover:border-[#FF8800] cursor-pointer transition-colors"
                filter="grayscale-[20%] hover:grayscale-0"
              />
            ))}
          </div>

          <div>
            <p className="text-lg mt-2 text-[#FFF04D]">
              {venue.location.city}, {venue.location.country}
            </p>
          </div>

          <div className="border-t pt-8 border-[#FF8800]">
            <h2 className="text-2xl font-bold mb-4 text-[#FFF04D]">
              About this venue
            </h2>
            <p className="text-[#FFF583] leading-relaxed whitespace-pre-line">
              {venue.description}
            </p>
          </div>

          <div className="border-t pt-8 border-[#FF8800]">
            <h2 className="text-2xl font-bold mb-4 text-[#FFF04D]">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 gap-4 text-[#98E902]">
              <div
                className={`flex items-center gap-3 ${!venue.meta.wifi && "text-[#FF544E]"}`}
              >
                {venue.meta.wifi ? "Fast Wifi" : "No Wifi"}
              </div>
              <div
                className={`flex items-center gap-3 ${!venue.meta.parking && "text-[#FF544E]"}`}
              >
                {venue.meta.parking ? "Free Parking" : "No Parking"}
              </div>
              <div
                className={`flex items-center gap-3 ${!venue.meta.breakfast && "text-[#FF544E]"}`}
              >
                {venue.meta.breakfast ? "Breakfast Included" : "No Breakfast"}
              </div>
              <div
                className={`flex items-center gap-3 ${!venue.meta.pets && "text-[#FF544E]"}`}
              >
                {venue.meta.pets ? "Pets Allowed" : "No Pets"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-[#FF8800] rounded-2xl p-3 sm:p-6 shadow-xl bg-[#FFC17A] sticky top-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-3xl font-bold">${venue.price}</span>
                <span className="text-gray-500"> / night</span>
              </div>
              <div className="text-sm font-semibold">
                {venue.rating ? `Rating: ${venue.rating}` : "New"}
              </div>
            </div>

            <div className="space-y-4 flex flex-col gap-10">
              <div className="border-2 border-[#FF8800] rounded-lg p-3 bg-white/30">
                <label className="block text-[10px] font-bold uppercase text-gray-600">
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max={venue.maxGuests}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-transparent font-bold text-lg outline-none"
                />
                <p className="text-[10px] text-gray-500">
                  Max: {venue.maxGuests} guests
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-[#FF8800] rounded-lg overflow-x-auto flex flex-col items-center p-2 sm:p-4">
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  fixedWeeks
                  footer={footer}
                  disabled={[{ before: new Date() }, ...bookedRanges]}
                  classNames={{
                    caption_label: "text-lg font-bold text-[#007878]",
                    month_caption:
                      "flex flex-col items-center justify-center pt-1 relative gap-2 mb-4",
                    nav: "flex items-center justify-center gap-4 sm:gap-8 w-full mt-2",
                    button_previous:
                      "h-8 w-8 bg-cyan-50 hover:bg-cyan-100 rounded-full flex items-center justify-center transition-colors text-[#007878] disabled:opacity-30",
                    button_next:
                      "h-8 w-8 bg-cyan-50 hover:bg-cyan-100 rounded-full flex items-center justify-center transition-colors text-[#007878] disabled:opacity-30",
                    month_grid: "w-full border-collapse",
                    weekdays: "flex justify-between mb-2",
                    weekday:
                      "text-gray-400 w-[34px] sm:w-10 font-normal text-[0.8rem] text-center",
                    week: "flex w-full mt-1",
                    day: "h-[34px] w-[34px] sm:h-10 sm:w-10 p-0 font-normal hover:bg-cyan-100 rounded-md transition-colors flex items-center justify-center",
                    day_button:
                      "h-[34px] w-[34px] sm:h-10 sm:w-10 flex items-center justify-center rounded-md",
                    selected: "bg-[#FF8800] text-black hover:bg-[#005a5a]",
                    range_middle: "bg-[#FFC17B] text-[#007878] flex gap-1",
                    disabled: "text-gray-300 line-through opacity-50",
                    today: "border border-[#007878] font-bold",
                  }}
                  modifiersClassNames={{
                    selected: "bg-blue-500 text-gray-500",
                    today: "font-bold text-blue-950",
                  }}
                />
              </div>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${
                  isBooking
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                }`}
                onClick={handleBooking}
                disabled={isBooking}
              >
                {isBooking
                  ? "Processing..."
                  : token
                    ? "Confirm Booking"
                    : "Login to Book"}
              </button>
            </div>

            <p className="text-center text-xs text-gray-600 mt-4">
              {token
                ? "Your dates are held upon confirmation"
                : "Sign in to complete reservation"}
            </p>
          </div>

          {venue.owner && (
            <div className="border rounded-2xl p-6 bg-[#FFC17A] flex items-center gap-4">
              <img
                src={venue.owner.avatar?.url || "https://placehold.co/100"}
                alt={venue.owner.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#007878]"
              />
              <div>
                <p className="text-sm text-gray-500">Hosted by</p>
                <p className="font-bold">{venue.owner.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
/* Added calendar component and designed it. 

fix calendar responsiveness from 1025px -> 1153px

add logic to it so that it displayes unavailable days to book and send POST request to book a set of days

fix the fetching of media so that it allows more images

Design
*/
