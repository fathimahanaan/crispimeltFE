import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ======================
  // CREATE ORDER
  // ======================
  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${base_url}/orders`,
        orderData,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Order placed successfully");

      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to place order";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // PREVIEW ORDER
  // ======================
  const previewOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${base_url}/orders/preview`,
        orderData,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to preview order";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // GET MY ORDERS
  // ======================
  const getMyOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${base_url}/orders/my-orders`,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch orders";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // GET SINGLE ORDER
  // ======================
  const getSingleOrder = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${base_url}/orders/${id}`,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch order";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CANCEL ORDER
  // ======================
  const cancelOrder = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.patch(
        `${base_url}/orders/${id}/cancel`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data.message || "Order cancelled");

      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to cancel order";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    previewOrder,
    getMyOrders,
    getSingleOrder,
    cancelOrder,
    loading,
    error,
  };
}