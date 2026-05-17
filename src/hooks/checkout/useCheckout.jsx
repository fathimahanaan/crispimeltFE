import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useCheckout() {
  const [loading, setLoading] = useState(false);

  // ======================
  // CREATE ORDER
  // ======================
  const createOrder = async (orderData) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/orders`,
        orderData,
        { withCredentials: true }
      );

      toast.success(
        res.data.message || "Order placed successfully"
      );

      return res.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // GET SINGLE ORDER
  // ======================
  const getSingleOrder = async (id) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${base_url}/orders/${id}`,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch order"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    getSingleOrder,
    loading,
  };
}