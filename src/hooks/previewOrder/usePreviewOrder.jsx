import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function usePreviewOrder() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const previewOrder = async (payload) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/order/preview`,
        payload,
        {
          withCredentials: true,
        }
      );

      console.log("PREVIEW RESPONSE:", res.data);

      setPreview(res.data.preview);
      return res.data.preview;
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to preview order"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    preview,
    loading,
    previewOrder,
  };
}