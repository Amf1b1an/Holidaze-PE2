import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, type RegisterData } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-[#FFC17A] p-8 rounded-2xl border-2 border-[#FF8800] shadow-xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#007878]">Create Account</h2>
          <p className="mt-2 text-sm text-gray-700">Join Holidaze today</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#007878]">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border-2 border-[#FF8800] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007878]"
                placeholder="Only letters, numbers and underscores"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#007878]">
                Email address
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border-2 border-[#FF8800] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007878]"
                placeholder="must be @stud.noroff.no"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#007878]">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full px-3 py-2 border-2 border-[#FF8800] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007878]"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="manager"
                className="w-4 h-4 accent-[#007878]"
                checked={formData.venueManager}
                onChange={(e) =>
                  setFormData({ ...formData, venueManager: e.target.checked })
                }
              />
              <label
                htmlFor="manager"
                className="text-sm font-bold text-[#007878]"
              >
                Register as Venue Manager
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-[#007878] hover:bg-[#005a5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007878] transition-all disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
