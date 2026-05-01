import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import useVerifyOtp from "../../hooks/auth/useVerifyOpt";
 

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const { verifyOtp, loading } = useVerifyOtp();

  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move forward
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // move back on delete
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      return toast.error("Enter full OTP");
    }

    await verifyOtp(email, code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#fff7f2,white)] px-6 font-[Lora]">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-[#f1e2d9] w-full max-w-md text-center">

        <h1 className="text-2xl font-semibold text-[#5D3838]">
          Verify OTP
        </h1>

        <p className="text-sm text-gray-500 mt-2 mb-6">
          Enter the 6-digit code sent to your email
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
              className="w-12 h-12 text-center text-lg border border-[#e5d4c8] rounded-lg focus:outline-none focus:border-[#8B5E3C]"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg w-full"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* RESEND (optional for now) */}
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span className="text-[#8B5E3C] cursor-pointer hover:underline">
            Resend
          </span>
        </p>

      </div>
    </div>
  );
}