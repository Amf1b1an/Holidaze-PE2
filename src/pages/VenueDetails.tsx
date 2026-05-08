import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { type Venue } from "../types";
import Hamburger from "../components/Hamburger";
import SideNav from "../components/SideNav";
import { DayPicker, type DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

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
    <div className="max-w-6xl mx-auto px-4 py-8 mb-20">
      <header className="flex justify-center mb-12 mt-12 text-center w-full px-4">
        <div className="flex justify-start items-center md:flex-1">
          <div className="hidden md:block">
            <Hamburger />
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold text-[#FFF04D] tracking-[2px] sm:tracking-[6.40px] [text-shadow:_3px_5px_0px_rgb(0_0_0_/_0.25)] mb-2">
            HOLIDAZE
          </h1>
          <h2 className="text-[#FFF04D] text-3xl md:text-4xl font-semibold tracking-[4px] [text-shadow:_2px_2px_0px_rgb(0_0_0_/_0.25)] text-shadow:_">
            {venue.name}
          </h2>
        </div>
        <div className="hidden md:flex justify-end items-center md:flex-1">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full border-2 border-[#FFF04D] text-[#FFF04D] hover:bg-[#FFF04D] hover:text-[#007878] transition-colors flex items-center"
          >
            #<span className="px-2 font-bold">PROFILE</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-200 aspect-video border-2 border-[#FF8800]">
            <img
              src={venue.media[0]?.url || "https://via.placeholder.com/800x450"}
              alt={venue.media[0]?.alt || venue.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-4xl font-extrabold"></h3>
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
                {" "}
                {venue.meta.parking ? "Free Parking" : "No Parking"}
              </div>
              <div
                className={`flex items-center gap-3 ${!venue.meta.breakfast && "text-[#FF544E]"}`}
              >
                {" "}
                {venue.meta.breakfast ? "Breakfast Included" : "No Breakfast"}
              </div>
              <div
                className={`flex items-center gap-3  ${!venue.meta.pets && "text-[#FF544E]"}`}
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
                {venue.rating || "New"}
              </div>
            </div>

            <div className="space-y-4 flex flex-col gap-10">
              <div className="border-2 border-[#FF8800] rounded-lg p-3">
                <label className="block text-[10px] font-bold uppercase text-gray-500">
                  Guests
                </label>
                <p>{venue.maxGuests} Guests Max</p>
              </div>

              <div className=" bg-gray-50 border-2 border-[#FF8800] rounded-lg overflow-x-auto flex flex-col items-center p-2 sm:p-4">
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={setSelectedRange}
                  fixedWeeks
                  footer={footer}
                  disabled={{ before: new Date() }}
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
            <div className="border rounded-2xl p-6 bg-[#FFC17A] flex items-center gap-4">
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

/* Added calendar component and designed it. 

fix calendar responsiveness from 1025px -> 1153px

add logic to it so that it displayes unavailable days to book and send POST request to book a set of days

fix the fetching of media so that it allows more images

Design
*/
