
import React, { useState } from 'react';
import { fetchWeather } from '../apiTest/api';
import locationMap from '../apiTest/location';
import Button from "../components/button";

const WeatherList = () => {
  const [selected, setSelected] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [hourlyData, setHourlyData] = useState({});
  const [search, setSearch] = useState('');

  const skyMap = {
    '1': '맑음',
    '3': '구름 많음',
    '4': '흐림',
  };

  const ptyMap = {
    '1': '비',
    '2': '비/눈',
    '3': '눈',
    '4': '소나기',
    '5': '빗방울',
    '6': '빗방울/눈날림',
    '7': '눈날림',
  };

  const getWindDirection = (degree) => {
    const directions = [
      "북풍", "북북동풍", "북동풍", "동북동풍",
      "동풍", "동남동풍", "남동풍", "남남동풍",
      "남풍", "남남서풍", "남서풍", "서남서풍",
      "서풍", "서북서풍", "북서풍", "북북서풍",
    ];
    const idx = Math.round((Number(degree) % 360) / 22.5) % 16;
    return directions[idx];
  };

  const handleSelect = async (region) => {
    setSelected(region);

    try {
      const items = await fetchWeather(region);
      const latest = {};
      const hourly = {};

      items.forEach(item => {
        const { category, value, fcstTime } = item;

        // 가장 첫 항목만 latest에 저장
        if (!latest[category]) {
          latest[category] = value;
        }

        // 시간별 예보 누적
        if (!hourly[fcstTime]) hourly[fcstTime] = {};
        hourly[fcstTime][category] = value;
      });

      setWeatherData(latest);
      setHourlyData(hourly);
    } catch (err) {
      console.error(err);
      alert("날씨 데이터를 불러오는 데 실패했습니다.");
    }
  };


  const handleBack = () => {
    setSelected(null);
    setWeatherData({});
    setHourlyData({});
  };

  const filteredLocations = Object.keys(locationMap).filter(loc =>
    loc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${selected ? 'h-screen flex items-center justify-center' : 'min-h-screen py-4'}`}>
      <div className="w-full max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">WeatherPeek</h1>

        {!selected && (
          <>
            <input
              type="text"
              placeholder="지역 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-2 pr-1">
              {filteredLocations.map(loc => (
                <div
                  key={loc}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(loc)}
                >
                  <span>{loc}</span>
                  <span>→</span>
                </div>
              ))}
            </div>
          </>
        )}

        {selected && (
          <div className="text-center w-full">
            <h2 className="text-2xl font-bold mb-4">{selected}</h2>
            <p className="text-lg font-medium mb-2">현재 날씨</p>
            <p>기온: {weatherData.T1H ?? '--'} °C</p>
            <p>습도: {weatherData.REH ?? '--'} %</p>
            <p>풍속: {weatherData.WSD ?? '--'} m/s</p>
            {weatherData.VEC && (
              <p>풍향: {getWindDirection(weatherData.VEC)} ({weatherData.VEC}°)</p>
            )}
            <p>하늘 상태: {skyMap[weatherData.SKY] ?? '--'}</p>
            {weatherData.PTY && weatherData.PTY !== '0' && (
              <p>강수 형태: {ptyMap[weatherData.PTY] ?? '강수 있음'}</p>
            )}
            {weatherData.RN1 && weatherData.RN1 !== '강수없음' && (
              <p>1시간 강수량: {weatherData.RN1}</p>
            )}

            {/* 시간대별 예보 */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-center">시간대별 예보</h3>
              <div className="overflow-x-auto mx-auto w-[380px] whitespace-nowrap flex space-x-2 p-2 border-t">
                {Object.entries(hourlyData).map(([time, data]) => (
                  <div
                    key={time}
                    className="min-w-[72px] w-[72px] text-center border rounded p-1 bg-gray-50"
                  >
                    <div className="text-xs font-medium">{time.slice(0, 2)}시</div>
                    <div className="text-base">{data.T1H ?? '--'}°</div>
                    <div className="text-xs">{skyMap[data.SKY] ?? '--'}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleBack}
            >
              ← 돌아가기
            </button> */}
            <br></br>
            <Button onClick={handleBack}>← 돌아가기</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherList;

