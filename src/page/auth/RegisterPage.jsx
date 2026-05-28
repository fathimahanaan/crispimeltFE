import React, { useState } from "react";
import useRegister from "../../hooks/auth/useRegister";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const { register, loading } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    if (password.length < 8) {
      return alert("Password must be at least 8 characters");
    }

    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      return alert("Phone number must be 10-15 digits");
    }

    await register(name, email, password, phoneNumber);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#fff7f2,white)] px-6 font-[Lora]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-[#f1e2d9] p-10">

        <h1 className="text-3xl font-semibold text-[#5D3838] text-center">
          Create Account
        </h1>

        <p className="text-center text-[#7A5C4D] mt-2 mb-8 text-sm">
          Join us and enjoy our fresh bakery delights
        </p>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-[#e5d4c8] outline-none p-3 rounded-sm"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#e5d4c8] outline-none p-3 rounded-sm"
            required
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-[#e5d4c8] outline-none p-3 rounded-sm"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#e5d4c8] outline-none p-3 rounded-sm"
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-[#e5d4c8] outline-none p-3 rounded-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#8B5E3C] text-white p-3 rounded-lg mt-2 hover:bg-[#70492f] transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#8B5E3C] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}