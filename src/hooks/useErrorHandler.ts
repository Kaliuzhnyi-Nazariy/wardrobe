import axios from "axios";
import { useCallback, useState } from "react";

interface ErrorMessage {
  field?: string;
  message: string;
}

export const useErrorHandler = () => {
  const [messages, setMessages] = useState<ErrorMessage[]>([]);

  const setError = useCallback((err: unknown) => {
    if (Array.isArray(err)) {
      setMessages(err);
      return;
    }

    if (axios.isAxiosError(err) && Array.isArray(err.response?.data)) {
      setMessages(err.response.data);
      return;
    }

    const fallbackMessage = axios.isAxiosError(err)
      ? err.response?.data?.message || err.message
      : err instanceof Error
      ? err.message
      : "Something went wrong";

    setMessages([{ message: fallbackMessage }]);
  }, []);

  const clearErrors = useCallback(() => setMessages([]), []);

  return { messages, setError, clearErrors };
};
