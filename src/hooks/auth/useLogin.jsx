import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 👈 pull setUser from shared context

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${base_url}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user); 
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      const data = err?.response?.data;
      toast.error(data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}