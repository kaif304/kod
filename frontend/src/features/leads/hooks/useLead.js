import { useState } from "react";
import { createLead } from "../services/lead.service";

export const useLead = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submitLead = async (payload) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await createLead(payload);

      setSuccess(true);

      return {
        success: true,
        data: response.data,
        message: response.message,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Unable to submit your inquiry. Please try again.";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError("");
    setSuccess(false);
  };

  return {
    loading,
    error,
    success,
    submitLead,
    reset,
  };
};