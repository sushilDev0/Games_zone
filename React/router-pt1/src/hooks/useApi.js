import { useEffect, useState } from "react";

const useApi = (url, options = {}) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setState({ data: null, error: null, loading: true });
      try {
        const resp = await fetch(url, { ...options, signal });
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const result = await resp.json();
        setState({ data: result, error: null, loading: false });
      } catch (e) {
        if (signal.aborted) return; // Ignore abort errors
        setState({ data: null, error: e, loading: false });
        console.error(e);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);

  console.log("useApi state", state);

  return state;
};

export default useApi;
