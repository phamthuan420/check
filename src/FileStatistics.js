import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileStatistics = ({ fileId }) => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`/public-api/file/${fileId}/statistics`, {
          headers: { 'Authorization': 'xxftwft1uud79b0pm7g4ohl0' }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching file statistics:', error);
      }
    };

    fetchStatistics();
  }, [fileId]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}s`;
  };

  if (!statistics) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div className="container" style={{ clear: 'both' }}>
      <h2 className="mt-4">Dữ liệu chi tiết</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>Điểm tương tác:</td>
            <td>{statistics.engagement_score}</td>
          </tr>
          <tr>
            <td>Tổng số lượt xem:</td>
            <td>{statistics.total_views}</td>
          </tr>
          <tr>
            <td>Thời gian trung bình (giây):</td>
            <td>{formatTime(statistics.avg_time_seconds)}</td>
          </tr>
          <tr>
            <td>Thời gian trung bình trên mỗi trang (giây):</td>
            <td>
              <table className="table">
                <thead>
                  <tr>
                    <th>Trang Báo Giá</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.avg_time_per_page_seconds.map((time, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatTime(time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Recordings</h3>
      <table className="table container">
        <thead>
          <tr>
            <th>Thời gian</th>
            <th>Địa chỉ IP</th>
            <th>Quốc gia</th>
            <th>URL giới thiệu</th>
            <th>Thời gian đọc (giây)</th>
          </tr>
        </thead>
        <tbody style={{ wordWrap: 'break-word' }}>
          {statistics.recordings.map((recording, index) => (
            <tr key={index}>
              <td>{recording.time}</td>
              <td>{recording.ip}</td>
              <td>{recording.country}</td>
              <td style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {recording.referrer_url}
              </td>
              <td>{formatTime(recording.read_time_sec)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileStatistics;
