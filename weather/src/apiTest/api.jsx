import axios from 'axios';

// 토큰
const TOKEN = localStorage.getItem('token');

// ✅ API base 주소
const BASE_URL = 'https://weather-backend.up.railway.app';

// ✅ 날씨 조회 API
export const fetchWeather = async (cityName) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather/by-city/ultra-forecast`, {
      params: {
        city: cityName,
      },
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        Accept: '*/*',
      },
    });

    // 응답 데이터 구조에 따라 변경 필요
    return response.data.items || response.data || [];
  } catch (error) {
    console.error('날씨 API 호출 실패:', error);
    throw error;
  }
};