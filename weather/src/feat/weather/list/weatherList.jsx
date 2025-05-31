import React, { useState } from 'react';
import { fetchWeather } from '../api';

const WeatherList = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [weatherMap, setWeatherMap] = useState({});

  const handleFetch = async () => {
    if (!x || !y) return alert("좌표를 입력하세요.");
    try {
      const items = await fetchWeather(Number(x), Number(y));
      const mapped = {};

      // category별로 데이터 저장
      items.forEach(item => {
        mapped[item.category] = item.obsrValue;
      });

      setWeatherMap(mapped);
    } catch (err) {
      console.error(err);
      alert("날씨 데이터를 불러오는 데 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>현재 날씨</h2>
      <input
        type="number"
        placeholder="x 좌표"
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <input
        type="number"
        placeholder="y 좌표"
        value={y}
        onChange={(e) => setY(e.target.value)}
      />
      <button onClick={handleFetch}>날씨 가져오기</button>

      <div style={{ marginTop: '20px', lineHeight: '2' }}>
        <div>습도: ({weatherMap.REH ?? ''})</div>
        <div>1시간 강수량: ({weatherMap.RN1 ?? ''})</div>
        <div>기온: ({weatherMap.T1H ?? ''})</div>
        <div>풍향: ({weatherMap.VEC ?? ''})</div>
        <div>풍속: ({weatherMap.WSD ?? ''})</div>
      </div>
    </div>
  );
};

export default WeatherList;
