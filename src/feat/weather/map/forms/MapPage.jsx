import React, { useState } from 'react'
import '/home/user/weatherapp/src/feat/weather/map/styles/MapPage.css'
import { paths } from '/home/user/weatherapp/src/feat/weather/map/data/Path.js'

const DEFAULT_FILL = '#E5E7EB'
const HOVER_FILL = '#A5B4FC'
const SELECTED_FILL = '#4F46E5'
const STROKE_COLOR = '#374151'

const MapForm = () => {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [weather, setWeather] = useState('')

  const handleRegionClick = (id) => {
    setSelectedRegion(id);
    const region = paths.find(p => p.id === id);
    if (region) {
      fetchWeather(region.nx, region.ny);
    }
  };

  const fetchWeather = async (nx, ny) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    const now = new Date();
    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = now.getHours().toString().padStart(2, '0') + '00';

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${apiKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const items = data.response.body.items.item;

      const temperatureItem = items.find(item => item.category === 'T1H');
      const temperature = temperatureItem ? temperatureItem.obsrValue : '정보 없음';

      setWeather(`기온: ${temperature}℃`);
    } catch (error) {
      console.error('날씨 정보를 가져오는 데 실패했습니다.', error);
      setWeather('날씨 정보를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <div className="map-container">
      <div className="topbar">
        <button className="back-button">←</button>
        <h1 className="title">Weatherly</h1>
      </div>

     
      <button type="button" disabled className="region-guide">
        지역을 선택하세요
      </button>

    
      <div className="region-name">
        {selectedRegion
          ? paths.find((p) => p.id === selectedRegion)?.name || '지역이름'
          : '지역이름'}
      </div>

    
      <div className="weather-info">{weather || '날씨'}</div>

     
      <div className="map-form">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 524 631"
          className="map-svg"
        >
          {paths.map(({ id, name, d }) => (
            <path
              key={id}
              id={id}
              name={name}
              d={d}
              fill={
                selectedRegion === id
                  ? SELECTED_FILL
                  : hoveredRegion === id
                  ? HOVER_FILL
                  : DEFAULT_FILL
              }
              stroke={STROKE_COLOR}
              strokeWidth={1}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredRegion(id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(id)}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default MapForm
