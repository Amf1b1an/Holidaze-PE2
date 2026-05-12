import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateVenueManagerStatus } from "../api/profiles";

export default function BecomeManager() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("name");

  const handleApply = async () => {
    if (!username) return;
    setLoading(true);
    try {
      await updateVenueManagerStatus(username, true);
      localStorage.setItem("isManager", "true");
      alert("Success! You are now a Venue Manager.");
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      alert("Failed to update status. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4">
      <div className="bg-[#FFC17A] p-8 rounded-2xl border-2 border-[#FF8800] max-w-md text-center shadow-xl">
        <h2 className="text-3xl font-bold text-[#007878] mb-4">
          BECOME A MANAGER
        </h2>
        <p className="text-gray-800 mb-8">
          When upgraded, you will be able to list your own venues and manage
          bookings.
        </p>
        <button
          onClick={handleApply}
          disabled={loading}
          className="w-full bg-[#007878] text-white py-4 rounded-xl font-bold text-xl hover:bg-[#005a5a] transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : "YES, UPGRADE MY ACCOUNT"}
        </button>
      </div>
    </div>
  );
}
