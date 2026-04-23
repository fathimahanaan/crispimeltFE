import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetAllProducts(selectedCategory) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async (category) => {
    setLoading(true);

    try {
      const url =
        category && category !== "All"
          ? `${base_url}/product?category=${category}`
          : `${base_url}/product`;

      const res = await axios.get(url, {
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
    getAllProducts(selectedCategory);
  }, [selectedCategory]); // 🔥 IMPORTANT

  return {
    products,
    loading,
    refetch: getAllProducts,
  };
}