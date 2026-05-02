import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useResendOtp() {
  const [loading, setLoading] = useState(false);

  const resendOtp = async (email) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/auth/resendOtp`,
        { email },
        { withCredentials: true }
      );

      toast.success(res.data.message || "OTP sent successfully");

      return res.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to resend OTP"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { resendOtp, loading };
}