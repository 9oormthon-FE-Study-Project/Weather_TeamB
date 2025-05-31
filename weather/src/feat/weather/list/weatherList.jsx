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
      const latestMap = {};

      // 최신 fcstTime 기준으로 항목 하나씩만 저장
      items.forEach(item => {
        const { category, fcstValue, fcstDate, fcstTime } = item;

        // 이미 들어간 항목은 무시하거나 최신 시간 기준으로 비교 가능
        if (!latestMap[category]) {
          latestMap[category] = fcstValue;
        }
      });

      setWeatherMap(latestMap);
    } catch (err) {
      console.error(err);
      alert("날씨 데이터를 불러오는 데 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>초단기 예보 (예측값)</h2>
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
        <div>기온 (°C): ({weatherMap.T1H ?? ''})</div>
        <div>습도 (%): ({weatherMap.REH ?? ''})</div>
        <div>1시간 강수량 (mm): ({weatherMap.RN1 ?? ''})</div>
        <div>풍향 (deg): ({weatherMap.VEC ?? ''})</div>
        <div>풍속 (m/s): ({weatherMap.WSD ?? ''})</div>
        <div>하늘 상태 (SKY): ({weatherMap.SKY ?? ''})</div>
        <div>강수 형태 (PTY): ({weatherMap.PTY ?? ''})</div>
        <div>낙뢰 (kA): ({weatherMap.LGT ?? ''})</div>
      </div>
    </div>
  );
};

export default WeatherList;
