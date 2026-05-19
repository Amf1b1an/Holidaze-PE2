import { Link } from "react-router-dom";
import { type Venue } from "../types";
import { useState } from "react";
import VenueManagerMenu from "./VenueManagerMenu";
import VenueModal from "./VenueModal";

export function VenueCard({
  venue,
  onRefresh = () => {},
}: {
  venue: any;
  onRefresh: () => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="relative group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
      <div className="absolute top-3 right-3 z-30">
        <VenueManagerMenu
          venueId={venue.id}
          ownerName={venue.owner?.name || ""}
          onEditClick={() => setIsEditOpen(true)}
          onDeleteSuccess={onRefresh}
        />
      </div>

      <Link to={`/venue/${venue.id}`} className="block h-full">
        <div className="border-4 border-[#007878] overflow-hidden shadow-sm group-hover:shadow-lg transition-all bg-white rounded-lg h-full flex flex-col">
          <div className="relative overflow-hidden">
            <img
              src={
                venue.media?.[0]?.url ||
                "https://placehold.co/400x300?text=No+Image"
              }
              alt={venue.media?.[0]?.alt || venue.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {venue.rating > 0 && (
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-bold shadow-sm text-gray-800">
                {venue.rating}
              </div>
            )}
          </div>

          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg truncate text-gray-900 group-hover:text-[#007878] transition-colors">
                {venue.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {venue.location?.city || "Remote"},{" "}
                {venue.location?.country || "Unknown"}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-lg text-gray-900">
                ${venue.price}{" "}
                <span className="text-sm font-normal text-gray-500">
                  / night
                </span>
              </span>
              <span className="text-xs text-gray-400">
                Max: {venue.maxGuests}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <VenueModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={venue}
        onSuccess={onRefresh}
      />
    </div>
  );
}

/* Still a lot of placeholders when it comes to the design, but some aspects are getting close to complete. */
