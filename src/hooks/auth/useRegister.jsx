import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, email, password, phoneNumber) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/auth/register`,
        { name, email, password, phoneNumber }
        // ✅ Removed withCredentials — register no longer sets a cookie
      );

      toast.success(res.data.message);

      localStorage.setItem("verifyEmail", email);

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {
      const data = err?.response?.data;

      if (data?.requireOtp) {
        toast.info("OTP already sent. Please verify your account.");
        localStorage.setItem("verifyEmail", data.email);
        navigate("/verify-otp", { state: { email: data.email } });
        return;
      }

      toast.error(data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}