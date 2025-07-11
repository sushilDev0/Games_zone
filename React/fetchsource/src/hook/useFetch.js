
import { useState, useEffect } from 'react';

const useFetch = ({ url, options }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setStatus(null);
            try {
                const response = await fetch(url, options);
                setStatus(response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, options]);

    return { data, error, loading, status };
};

export default useFetch;
