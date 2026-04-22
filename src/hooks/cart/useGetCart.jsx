import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetCart() {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${base_url}/cart`, {
        withCredentials: true,
      });

      setCart(res.data || []);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return { cart, loading, refetch: getCart };
}