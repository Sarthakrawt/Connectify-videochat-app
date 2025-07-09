import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isPending, error, loginMutation, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row w-full max-w-5xl">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 space-y-6">
          {/* Header */}
          <h1 className="text-3xl font-bold text-blue-700 font-mono">Connectify</h1>
          <p className="text-sm text-gray-500">
            Sign in to your account to continue your language journey
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md">
              {error.response?.data?.message || "Login failed. Try again."}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-black placeholder:text-gray-600 text-gray-600" 
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-black placeholder:text-gray-600 text-gray-600"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition ${
                isPending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-sm text-center mt-4 text-black">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-950 items-center justify-center text-white">
          <div className="max-w-md p-8 text-center">
            <img
              src="/Chatting-rafiki.png"
              alt="Language connection illustration"
              className="w-64 h-64 mx-auto object-contain"
            />
            <h2 className="text-xl font-semibold mt-6">Connect with language partners worldwide</h2>
            <p className="text-sm text-blue-200 mt-2">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
