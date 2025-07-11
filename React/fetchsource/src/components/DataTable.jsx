import React, { useState, useMemo } from 'react';
import useFetch from '../hook/useFetch';

const PAGE_SIZE = 10;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
        const cmp = comparator(a[0], b[0]);
        if (cmp !== 0) return cmp;
        return a[1] - b[1];
    });
    return stabilized.map(el => el[0]);
}

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'title', label: 'Title' },
    { id: 'body', label: 'Body' }
];

const DataTable = () => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [filter, setFilter] = useState('');

    const options = useMemo(() => ({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }), []);

    const { data, error, loading } = useFetch({
        url: 'https://jsonplaceholder.typicode.com/posts',
        options
    });

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!filter) return data;
        const lower = filter.toLowerCase();
        return data.filter(
            item =>
                item.title.toLowerCase().includes(lower) ||
                item.body.toLowerCase().includes(lower) ||
                String(item.id).includes(lower)
        );
    }, [data, filter]);

    const sortedData = useMemo(() => {
        return stableSort(filteredData, getComparator(order, orderBy));
    }, [filteredData, order, orderBy]);

    const paginatedData = sortedData.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    return (
        <div style={{ width: '100%', padding: 16 }}>
            <h2>DataTable</h2>
            <input
                type="text"
                placeholder="Filter"
                value={filter}
                onChange={handleFilterChange}
                style={{ marginBottom: 16, padding: 4 }}
            />
            <div style={{ overflowX: 'auto' }}>
                <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {headCells.map(headCell => (
                                <th
                                    key={headCell.id}
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                    onClick={() => handleRequestSort(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (order === 'asc' ? ' ▲' : ' ▼') : ''}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={3} align="center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan={3} align="center">
                                    Error: {error}
                                </td>
                            </tr>
                        )}
                        {!loading && !error && paginatedData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                            </tr>
                        ))}
                        {!loading && !error && paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={3} align="center">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => handleChangePage(0)} disabled={page === 0}>First</button>
                <button onClick={() => handleChangePage(page - 1)} disabled={page === 0}>Prev</button>
                <span>Page {page + 1} of {totalPages}</span>
                <button onClick={() => handleChangePage(page + 1)} disabled={page >= totalPages - 1}>Next</button>
                <button onClick={() => handleChangePage(totalPages - 1)} disabled={page >= totalPages - 1}>Last</button>
            </div>
        </div>
    );
};

export default DataTable;
