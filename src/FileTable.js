import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileStatistics from './FileStatistics';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap

const FileTable = ({ directoryId }) => {
  const [files, setFiles] = useState([]);
  const [selectedFileIds, setSelectedFileIds] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`https://www.helprange.com/public-api/directory/${directoryId}/file`, {
          headers: { 'Authorization': 'xxftwft1uud79b0pm7g4ohl0' }
        });
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [directoryId]);

  const handleClick = (fileId) => {
    setSelectedFileIds((prevSelectedFileIds) => {
      if (prevSelectedFileIds.includes(fileId)) {
        return prevSelectedFileIds.filter((id) => id !== fileId);
      } else {
        return [...prevSelectedFileIds, fileId];
      }
    });
  };

  if (!files || !Array.isArray(files) || files.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>List of Files</h2>
      <ul className="list-group">
        {files.map((file) => (
          <li key={file.id} className="list-group-item justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                File ID: {file.id}
                <br />
                Tên Báo Giá: {file.name}
              </span>
              <button className="btn btn-primary" onClick={() => handleClick(file.id)}>
                Xem chi tiết
              </button>
            </div>
            {selectedFileIds.includes(file.id) && <FileStatistics fileId={file.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileTable;
