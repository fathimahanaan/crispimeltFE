 import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useVerifyOpt() {
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (email, otp) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/auth/verify`,
        { email, otp }, // ⚠️ make sure backend expects "otp"
        { withCredentials: true }
      );

      toast.success(res.data.message || "OTP verified successfully");

      return true; // ✅ important
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid or expired OTP"
      );
      return false;  
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading };
}