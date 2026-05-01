import { useState } from "react";
import axios from "axios";
 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/constants";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, email, password, phoneNumber) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/auth/register`,
        { name, email, password, phoneNumber },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // go to OTP verification page
      navigate("/verify-otp", { state: { email } });

    } catch (err) {
      // handle express-validator errors
      if (err?.response?.data?.errors) {
        err.response.data.errors.forEach((e) => {
          toast.error(e.msg);
        });
      } else {
        toast.error(
          err?.response?.data?.message || "Registration failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}