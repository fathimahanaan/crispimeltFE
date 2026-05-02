import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useVerifyOtp from "../../hooks/auth/useVerifyOpt";
import useResendOtp from "../../hooks/auth/useResendOtp";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");

  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const { verifyOtp, loading } = useVerifyOtp();
  const { resendOtp, loading: resendLoading } = useResendOtp();

  const location = useLocation();

  // ✅ get email safely (state OR localStorage)
  useEffect(() => {
    const savedEmail =
      location.state?.email || localStorage.getItem("verifyEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.setItem("verifyEmail", savedEmail);
    }
  }, [location.state]);

  // OTP input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // verify OTP
  const handleVerify = async () => {
    const code = otp.join("");

    if (!email) {
      return toast.error("Email missing. Please enter email.");
    }

    if (code.length !== 6) {
      return toast.error("Enter full OTP");
    }

    await verifyOtp(email, code);
  };

  // resend OTP
  const handleResend = async () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }

    await resendOtp(email);
  };

  // if email missing → fallback UI
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
          <h2 className="text-lg font-semibold mb-3">Verify Account</h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={() => {
              if (!email) return toast.error("Enter email");
              localStorage.setItem("verifyEmail", email);
              resendOtp(email);
            }}
            className="bg-[#8B5E3C] text-white w-full py-2 rounded"
          >
            Send OTP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#fff7f2,white)] px-6 font-[Lora]">

      <div className="bg-white p-10 rounded-2xl shadow-xl border w-full max-w-md text-center">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-[#5D3838]">
          Verify OTP
        </h1>

        <p className="text-sm text-gray-500 mt-2 mb-6">
          Enter the 6-digit code sent to <b>{email}</b>
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border rounded-lg focus:border-[#8B5E3C]"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg w-full disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* RESEND */}
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span
            onClick={handleResend}
            className="text-[#8B5E3C] cursor-pointer hover:underline"
          >
            {resendLoading ? "Sending..." : "Resend"}
          </span>
        </p>

        {/* CHANGE EMAIL */}
        <p
          onClick={() => {
            localStorage.removeItem("verifyEmail");
            setEmail("");
          }}
          className="text-xs text-gray-400 mt-3 cursor-pointer hover:underline"
        >
          Use a different email
        </p>

      </div>

    </div>
  );
}