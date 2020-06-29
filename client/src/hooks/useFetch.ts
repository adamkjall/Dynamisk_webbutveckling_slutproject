import { useState, useEffect } from "react";

/**
 * Custom fetch hook
 * @param url Url to send request to
 * @param options Fetch options
 * @param depencies Dependency array
 */
const useFetch = (url: string, options?: RequestInit, dependancies?: any[]) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        if (!signal.aborted) {
          setResponse(json);
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [...dependancies]);

  return { response, error, loading };
};

export default useFetch;
