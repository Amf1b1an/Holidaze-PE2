import { useEffect, useState } from "react";
import { getProfile } from "../api/profiles";
import Layout from "../components/Layout";
import { Mail, ShieldCheck } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const username = localStorage.getItem("name");

  useEffect(() => {
    if (username) {
      getProfile(username)
        .then((data) => setProfile(data))
        .catch((err) => setError(err.message));
    }
  }, [username]);

  if (error)
    return (
      <Layout>
        <div className="text-red-500 text-center mt-10">{error}</div>
      </Layout>
    );
  if (!profile)
    return (
      <Layout>
        <div className="text-[#FFF04D] text-center mt-10">
          Loading profile...
        </div>
      </Layout>
    );

  return (
    <Layout subtitle={profile.name}>
      <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
        <div className="bg-[#FFC17A] p-8 rounded-2xl border-4 border-[#FF8800] shadow-2xl w-full lg:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img
                src={profile.avatar?.url || "https://placehold.co/150"}
                alt={profile.avatar?.alt || profile.name}
                className="w-32 h-32 rounded-full border-4 border-[#007878] object-cover bg-white"
              />
              {profile.venueManager && (
                <div
                  className="absolute -bottom-2 -right-2 bg-[#007878] text-white p-2 rounded-full border-2 border-[#FF8800]"
                  title="Venue Manager"
                >
                  <ShieldCheck size={20} />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-[#007878] uppercase">
                {profile.name}
              </h3>
              <div className="flex items-center justify-center gap-2 text-[#9c5600] font-bold text-sm">
                <Mail size={16} />
                {profile.email}
              </div>
            </div>

            <div className="w-full pt-4 border-t-2 border-[#FF8800]/30 text-left">
              <p className="text-xs font-black text-[#9c5600] uppercase mb-1">
                About Me
              </p>
              <p className="text-gray-800 italic">
                {profile.bio ||
                  "No bio provided yet. Let people know who you are!"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-grow w-full space-y-6">
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 border-2 border-[#FFF04D] p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-[#FFF04D] font-bold uppercase text-sm">
                Total Bookings
              </p>
              <p className="text-5xl font-black text-[#FFF04D]">
                {profile._count?.bookings || 0}
              </p>
            </div>

            {profile.venueManager && (
              <div className="bg-[#FFF04D] border-2 border-[#007878] p-6 rounded-2xl shadow-lg">
                <p className="text-[#007878] font-bold uppercase text-sm">
                  My Managed Venues
                </p>
                <p className="text-5xl font-black text-[#007878]">
                  {profile._count?.venues || 0}
                </p>
              </div>
            )}
          </div>
          {!profile.venueManager && (
            <div className="bg-[#005a5a] p-6 rounded-2xl border-2 border-[#FFF04D] flex items-center justify-between">
              <div>
                <h4 className="text-[#FFF04D] font-bold text-lg">
                  Become a Venue Manager
                </h4>
                <p className="text-white/80 text-sm">
                  Start listing your own properties and earn!
                </p>
              </div>
              <button className="bg-[#FFF04D] text-[#007878] px-4 py-2 rounded-lg font-black text-xs hover:scale-105 transition-transform">
                APPLY NOW
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
