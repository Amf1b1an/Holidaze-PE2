import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";

interface VenueManagerMenuProps {
  venueId: string;
  ownerName: string;
  onEditClick: () => void;
  onDeleteSuccess: () => void;
}

export default function VenueManagerMenu({
  venueId,
  ownerName,
  onEditClick,
  onDeleteSuccess,
}: VenueManagerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentUser = localStorage.getItem("name");
  const isManager = localStorage.getItem("isManager") === "true";
  const isOwner = currentUser?.toLowerCase() === ownerName?.toLowerCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isManager || !isOwner) return null;

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to permanently delete this listing?",
      )
    )
      return;
    try {
      const { deleteVenue } = await import("../api/venues");
      await deleteVenue(venueId);
      alert("Venue successfully wiped from database records.");
      onDeleteSuccess();
    } catch (err: any) {
      alert(err.message || "Failed to process target deletion.");
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded-full bg-black/40 text-white border border-white/20 hover:bg-black/60 transition-colors shadow-md backdrop-blur-xs"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white border-2 border-[#FF8800] shadow-2xl z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onEditClick();
            }}
            className="w-full px-4 py-2.5 text-sm font-bold text-[#007878] hover:bg-[#FFC17A]/30 flex items-center gap-2 text-left border-b border-gray-100 transition-colors"
          >
            <Edit3 size={16} />
            Edit Venue
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              handleDelete();
            }}
            className="w-full px-4 py-2.5 text-sm font-black text-red-600 hover:bg-red-50 flex items-center gap-2 text-left transition-colors"
          >
            <Trash2 size={16} />
            Delete Venue
          </button>
        </div>
      )}
    </div>
  );
}
