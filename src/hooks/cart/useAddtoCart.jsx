import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useAddtoCart() {
  const [loading, setLoading] = useState(false);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/cart/add`,
        { productId, quantity },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Added to cart");

      return res.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to add to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading };
}