import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 👈 pull setUser from shared context

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${base_url}/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null); // 👈 clears context immediately
      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}