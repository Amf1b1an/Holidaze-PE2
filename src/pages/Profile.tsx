import { useEffect, useState } from "react";
import { getProfile } from "../api/profiles";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const username = localStorage.getItem("name");

  useEffect(() => {
    if (username) {
      console.log("Fetching profile for:", username);
      console.log(
        "Using Token:",
        localStorage.getItem("token")?.substring(0, 10) + "...",
      );

      getProfile(username)
        .then(setProfile)
        .catch((err) => {
          console.error("Profile Fetch Error:", err);
          setError(err.message);
        });
    }
  }, [username]);

  if (error)
    return <div className="text-red-500 mt-20 text-center">{error}</div>;
  if (!profile)
    return (
      <div className="text-[#FFF04D] mt-20 text-center">Loading profile...</div>
    );

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4 w-full">
      <div className="bg-[#FFC17A] p-8 rounded-2xl border-2 border-[#FF8800] shadow-2xl w-full max-w-md">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-[#007878] border-b-2 border-[#FF8800] pb-4">
            My Profile
          </h1>

          <div className="space-y-4 text-left">
            <div>
              <p className="text-xs font-bold uppercase text-[#9c5600]">
                Username
              </p>
              <p className="text-xl font-semibold text-gray-800">
                {profile.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-[#9c5600]">
                Email Address
              </p>
              <p className="text-lg text-gray-800">{profile.email}</p>
            </div>

            <div className="pt-4">
              <span
                className={`px-4 py-2 rounded-full font-bold text-sm ${
                  profile.venueManager
                    ? "bg-[#007878] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {profile.venueManager ? "✓ VENUE MANAGER" : "CUSTOMER ACCOUNT"}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="mt-8 w-full py-2 border-2 border-[#007878] text-[#007878] font-bold rounded-xl hover:bg-[#007878] hover:text-white transition-all"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}
