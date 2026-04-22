import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetAllCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${base_url}/category`, {
        withCredentials: true,
      });

      console.log("API RESPONSE:", res.data);

      setCategories(res.data.categories || res.data || []);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return { categories, loading, refetch: getAllCategories };
}