import React, { useState } from 'react';
import axios from 'axios';

const WeatherTest = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://weather-backend.up.railway.app/weather/by-city/ultra-forecast`,
        {
          params: { city },
        }
      );
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? `${err.response.status} ${err.response.statusText}` : err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
      <h2>단기예보 API 테스트</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="예: 경기도"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '200px' }}
        />
        <button
          onClick={fetchWeather}
          style={{ padding: '10px 16px', fontSize: '16px', cursor: 'pointer' }}
        >
          조회
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <strong>에러:</strong> {error}
        </div>
      )}

      {result && (
        <pre
          style={{
            maxWidth: '90%',
            maxHeight: '400px',
            overflowY: 'auto',
            backgroundColor: '#f4f4f4',
            padding: '15px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default WeatherTest;
