import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${base_url}/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);  
      toast.success(res.data.message || "Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Logout failed"
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}