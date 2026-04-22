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

      navigate("/"); // redirect after login
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}