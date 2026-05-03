import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

// ... imports
export default function useGetWishlist() {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/wishlist/`, { withCredentials: true });
      setWishlist(res.data || []);
    } catch (err) {
      // Logic: Just show the toast, don't navigate
      const errorMessage = err?.response?.data?.msg || 
                           err?.response?.data?.message || 
                           "Please login to access your wishlist";
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getWishlist(); }, []);
  return { wishlist, loading, refetch: getWishlist };
}