import React from 'react';
import { DataProvider } from './context/DataContext';
import DataTable from './components/DataTable';

function App() {
  return (
    <DataProvider>
      <DataTable />
    </DataProvider>
  );
}

export default App;
