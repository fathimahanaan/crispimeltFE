import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetSingleProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSingleProduct = async () => {
    if (!id) return;

    setLoading(true);

    try {
      const res = await axios.get(`${base_url}/product/${id}`, {
        withCredentials: true,
      });

      setProduct(res.data.product);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  return {
    product,
    loading,
    refetch: getSingleProduct,
  };
}