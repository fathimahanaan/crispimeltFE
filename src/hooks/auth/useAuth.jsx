import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

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

        if (res.data.message) {
          toast.success(res.data.message);
        }
      } catch (err) {
        setUser(null);

        if (err?.response?.data?.message) {
          toast.error(err.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser, loading };
}