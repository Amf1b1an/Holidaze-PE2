import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isRegistering) {
      return;
    }

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("name", data.name);
      localStorage.setItem("isManager", JSON.stringify(data.venueManager));
      navigate("/");

      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-[#FFC17A] p-8 rounded-2xl border-2 border-[#FF8800] shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#007878]">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-[#007878]">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border-2 border-[#FF8800] rounded-lg mt-1 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#007878]">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 border-2 border-[#FF8800] rounded-lg mt-1 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007878] text-white py-3 rounded-lg font-bold hover:bg-[#005a5a] transition-colors shadow-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : isRegistering ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[#007878] hover:underline text-sm font-bold"
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
