import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useWishList() {
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async (productId) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/wishlist/toggle`,
        { productId },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Updated wishlist");

      return res.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  return { toggleWishlist, loading };
}