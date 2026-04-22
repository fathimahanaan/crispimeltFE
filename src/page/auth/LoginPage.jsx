 
import React, { useState } from "react";
import useLogin from "../../hooks/auth/useLogin";

export default function LoginPage() {
  const { login, loading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#fff7f2,white)] px-6 font-[Lora]">

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-[#f1e2d9]">

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-[#FFF1E8] p-10">
          <img
            src="/images/image2.png"
            alt="Bakery"
            className="w-full max-w-xs object-contain"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-semibold text-[#5D3838] text-center">
            Welcome Back
          </h1>

          <p className="text-center text-[#7A5C4D] mt-2 mb-8 text-sm">
            Login to enjoy our fresh bakery delights
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#e5d4c8] p-3 rounded-lg focus:outline-none focus:border-[#8B5E3C] transition"
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#e5d4c8] p-3 rounded-lg focus:outline-none focus:border-[#8B5E3C] transition"
              required
            />

            {/* LOGIN BUTTON */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="bg-[#8B5E3C] text-white p-3 rounded-lg mt-2 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span className="text-[#8B5E3C] font-medium cursor-pointer hover:underline">
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
 
