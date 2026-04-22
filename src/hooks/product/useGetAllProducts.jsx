import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${base_url}/product`, {
        withCredentials: true,
      });

      setProducts(res.data.products);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    products,
    loading,
    refetch: getAllProducts,
  };
}