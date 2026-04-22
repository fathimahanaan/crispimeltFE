import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useRemoveCart() {
  const [loading, setLoading] = useState(false);

  const removeFromCart = async (id) => {
    setLoading(true);

    try {
      const res = await axios.delete(`${base_url}/cart/${id}`, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Item removed");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to remove item"
      );
    } finally {
      setLoading(false);
    }
  };

  return { removeFromCart, loading };
}