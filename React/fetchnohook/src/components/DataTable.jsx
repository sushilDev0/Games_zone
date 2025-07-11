import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'body', label: 'Body' },
];

const DataTable = () => {
  const {
    data, loading, error,
    search, setSearch,
    filterUser, setFilterUser,
    order, setOrder, orderBy, setOrderBy,
    page, setPage, totalPages
  } = useContext(DataContext);

  const handleSort = (col) => {
    if (orderBy === col) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(col);
      setOrder('asc');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Posts Table</h2>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Search…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          style={{ marginRight: 8 }}
        />
        <select
          value={filterUser || ''}
          onChange={e => { setFilterUser(e.target.value || null); setPage(0); }}
        >
          <option value="">All Users</option>
          {[...Array(10)].map((_, i) => (
            <option key={i+1} value={i+1}>User {i+1}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
          <thead>
            <tr>
              {headCells.map(col => (
                <th key={col.id} onClick={() => handleSort(col.id)} style={{ cursor: 'pointer' }}>
                  {col.label} {orderBy === col.id ? (order === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={3} align="center">No data</td></tr>
            )}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage(0)} disabled={page === 0}>First</button>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 0}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page + 1} / {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page + 1 >= totalPages}>Next</button>
        <button onClick={() => setPage(totalPages - 1)} disabled={page + 1 >= totalPages}>Last</button>
      </div>
    </div>
  );
};

export default DataTable;
