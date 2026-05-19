import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  updateVenueManagerStatus,
} from "../api/profiles";
import Layout from "../components/Layout";
import EditProfile from "../components/EditProfile";
import ImageProcessing from "../components/ImageProcessing";
import {
  Mail,
  ShieldCheck,
  Edit2,
  Calendar,
  LayoutDashboard,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const username = localStorage.getItem("name");

  useEffect(() => {
    if (username) {
      getProfile(username)
        .then((data) => setProfile(data))
        .catch((err) => setError(err.message));
    }
  }, [username]);

  const handleSaveProfile = async (avatarUrl: string, bio: string) => {
    if (!username) return;
    const updated = await updateProfile(username, { avatarUrl, bio });
    setProfile(updated);
  };

  const handleApplyManager = async () => {
    if (!username) return;
    try {
      const updated = await updateVenueManagerStatus(username, true);
      setProfile(updated);
      localStorage.setItem("isManager", "true");
      alert("Application Successful! You are now a recognized Venue Manager.");
    } catch (err: any) {
      alert(err.message || "Failed to update manager status.");
    }
  };

  if (error)
    return (
      <Layout>
        <div className="text-red-500 text-center mt-10 font-bold">{error}</div>
      </Layout>
    );
  if (!profile)
    return (
      <Layout>
        <div className="text-[#FFF04D] text-center mt-10 animate-pulse font-semibold">
          Loading profile...
        </div>
      </Layout>
    );

  return (
    <Layout subtitle={profile.name}>
      <div className="flex flex-col lg:flex-row gap-8 w-full items-start max-w-6xl mx-auto px-4 py-4">
        <div className="bg-[#FFC17A] p-8 rounded-2xl border-4 border-[#FF8800] shadow-2xl w-full lg:max-w-md relative group">
          <button
            onClick={() => setIsEditOpen(true)}
            className="absolute top-4 right-4 p-2.5 bg-[#007878] text-white rounded-full hover:bg-[#005a5a] transition-all hover:scale-110 shadow-md z-10"
            title="Edit Profile"
          >
            <Edit2 size={16} />
          </button>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <ImageProcessing
                src={profile.avatar?.url || ""}
                alt={profile.avatar?.alt || profile.name}
                fallback="https://placehold.co/150?text=Avatar"
                className="w-32 h-32 rounded-full border-4 border-[#007878] bg-white shadow-inner"
              />
              {profile.venueManager && (
                <div className="absolute -bottom-2 -right-2 bg-[#007878] text-white p-2 rounded-full border-2 border-[#FF8800] shadow z-10">
                  <ShieldCheck size={20} />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-[#007878] uppercase tracking-wide">
                {profile.name}
              </h3>
              <div className="flex items-center justify-center gap-2 text-[#9c5600] font-bold text-sm">
                <Mail size={16} />
                {profile.email}
              </div>
            </div>

            <div className="w-full pt-4 border-t-2 border-[#FF8800]/30 text-left">
              <p className="text-xs font-black text-[#9c5600] uppercase mb-1 tracking-wider">
                About Me
              </p>
              <p className="text-gray-800 italic whitespace-pre-line leading-relaxed">
                {profile.bio ||
                  "No bio provided yet. Let people know who you are!"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-grow w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 border-2 border-[#FFF04D] p-6 rounded-2xl backdrop-blur-xs flex flex-col justify-between shadow-xl">
              <div>
                <p className="text-[#FFF04D] font-bold uppercase text-xs tracking-wider">
                  Total Bookings
                </p>
                <p className="text-6xl font-black text-[#FFF04D] my-2">
                  {profile._count?.bookings || 0}
                </p>
              </div>
              <button
                onClick={() => navigate("/my-bookings")}
                className="mt-4 w-full py-3 bg-[#FFF04D] text-[#007878] font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow hover:bg-[#ffe34d] transition-all"
              >
                <Calendar size={18} /> VIEW MY BOOKINGS
              </button>
            </div>

            {profile.venueManager && (
              <div className="bg-[#FFF04D] border-2 border-[#007878] p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <p className="text-[#007878] font-bold uppercase text-xs tracking-wider">
                    My Managed Venues
                  </p>
                  <p className="text-6xl font-black text-[#007878] my-2">
                    {profile._count?.venues || 0}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/venue-bookings")}
                  className="mt-4 w-full py-3 bg-[#007878] text-[#FFF04D] font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow hover:bg-[#005a5a] transition-all"
                >
                  <LayoutDashboard size={18} /> BOOKING OVERVIEW
                </button>
              </div>
            )}
          </div>

          {!profile.venueManager && (
            <div className="bg-[#005a5a] p-6 rounded-2xl border-2 border-[#FFF04D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <h4 className="text-[#FFF04D] font-bold text-xl uppercase tracking-wide">
                  Become a Venue Manager
                </h4>
                <p className="text-white/80 text-sm mt-0.5">
                  Start listing your own properties and manage reservations!
                </p>
              </div>
              <button
                onClick={handleApplyManager}
                className="w-full sm:w-auto bg-[#FFF04D] text-[#007878] px-6 py-3 rounded-xl font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-md whitespace-nowrap"
              >
                APPLY NOW
              </button>
            </div>
          )}
        </div>
      </div>

      <EditProfile
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentAvatar={profile.avatar?.url || ""}
        currentBio={profile.bio || ""}
        onSave={handleSaveProfile}
      />
    </Layout>
  );
}
