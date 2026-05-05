import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering && !email.endsWith("@stud.noroff.no")) {
      alert(
        "Registration is only open to users with a @stud.noroff.no email address.",
      );
      return;
    }
    console.log("Form submitted for:", email);
    alert("API connection coming next!");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isRegistering
              ? "Register to book or manage venues"
              : "Sign in to your Holidaze account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="UniqueUsername"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={
                isRegistering ? "user@stud.noroff.no" : "yourname@example.com"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          {isRegistering && (
            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="manager" className="w-4 h-4" />
              <label htmlFor="manager" className="text-sm text-gray-700">
                Register as a Venue Manager
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            {isRegistering ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 text-gray-400 text-xs hover:text-gray-600 transition-colors"
        >
          Cancel and return to home
        </button>
      </div>
    </div>
  );
}
