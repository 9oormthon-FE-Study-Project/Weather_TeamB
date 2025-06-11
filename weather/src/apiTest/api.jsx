// src/feat/weather/api.jsx
import axios from "axios";

export const fetchWeather = async (x, y) => {
  const now = new Date();
  const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');

  // 초단기예보는 30분 단위, 매시각 45분 이후 제공
  const getBaseTime = () => {
    let hour = now.getHours();
    let minute = now.getMinutes();

    if (minute < 45) {
      hour -= 1;
    }

    if (hour < 0) hour = 23;

    return hour.toString().padStart(2, '0') + '30';
  };

  const baseTime = getBaseTime();

  try {
    const response = await axios.get(
      'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
      {
        params: {
          serviceKey:'l7F9H/Uh45pWfnjWKpd6N7OyHeazTbRzzqPgWUvEotU3EhDVbZTNFUUvR6p/cXoFcB0IuZlrR+T+xL/faSmKnA==',
          dataType: "JSON",
          pageNo: 1,
          numOfRows: 100,
          base_date: baseDate,
          base_time: baseTime,
          nx: x,
          ny: y,
        }
      }
    );

    const data = response.data;

    if (data.response?.header?.resultCode !== '00') {
      console.error('🔴 API 응답 오류:', data.response?.header);
      throw new Error(data.response?.header?.resultMsg || 'API 응답 에러');
    }

    return data.response.body.items.item;

  } catch (error) {
    console.error("❌ API 호출 실패:", error);
    throw error;
  }
};
