import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // ✅ normal login success
      navigate("/");
    } catch (err) {
      const data = err?.response?.data;

      // 🚨 OTP REQUIRED CASE (THIS WAS MISSING)
      if (data?.requireOtp) {
        localStorage.setItem("verifyEmail", data.email);

        toast.info("Please verify your account");

        navigate("/verify-otp", {
          state: { email: data.email },
        });

        return;
      }
 
      toast.error(data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}