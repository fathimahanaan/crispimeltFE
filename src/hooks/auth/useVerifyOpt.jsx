import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useVerifyOtp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOtp = async (email, otp) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/auth/verify`, // ✅ FIXED
        { email, otp },
        { withCredentials: true },
      );

      toast.success(res.data.message);

      navigate("/login"); // same pattern as login hook
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading };
}
