import React, { createContext, useState, useEffect, useMemo } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [filterUser, setFilterUser] = useState(null);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  const url = useMemo(() => {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    const params = new URLSearchParams();

    if (search) params.append('q', search);
    if (filterUser) params.append('userId', filterUser);

    return `${baseUrl}?${params.toString()}`;
  }, [search, filterUser]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message);
          setData([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [url]);

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, orderBy, order]);

  const paginated = useMemo(() => {
    const start = page * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, page]);

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

  return (
    <DataContext.Provider value={{
      search, setSearch,
      filterUser, setFilterUser,
      order, setOrder,
      orderBy, setOrderBy,
      page, setPage,
      data: paginated,
      loading, error,
      totalPages
    }}>
      {children}
    </DataContext.Provider>
  );
};
