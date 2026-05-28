import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${base_url}/auth/me`, {
        withCredentials: true,
      });

      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false); // 🔥 IMPORTANT
    }
  };

  fetchUser();
}, []);
  return { user, setUser, loading };
}