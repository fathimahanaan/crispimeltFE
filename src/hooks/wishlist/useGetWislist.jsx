import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetWishlist() {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${base_url}/wishlist/`, {
        withCredentials: true,
      });

      setWishlist(res.data || []);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return { wishlist, loading, refetch: getWishlist };
}