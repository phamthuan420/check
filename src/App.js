import React from 'react';
import FileTable from './FileTable';

const App = () => {
  const directoryId = 7848;

  return (
    <div className="container">
      <h1 style={{ textAlign:"center" }}>PHÂN TÍCH BÁO GIÁ HÀ NỘI</h1>
      <FileTable directoryId={directoryId} />
    </div>
  );
};

export default App;
