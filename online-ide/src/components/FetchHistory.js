import React, { useEffect, useState } from "react";
import axios from 'axios';

function FetchHistory() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/history");
      setHistory(response.data);
    } catch (err) {
      console.error("Error Fetching History", err);
    }
  };

  return (
    <div>
      <h2>Your last 5 codes</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <pre>Code : {entry.code}</pre>
            <pre>Result : {entry.result}</pre>
            <pre>Timestamp: {entry.timestamp}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchHistory;
