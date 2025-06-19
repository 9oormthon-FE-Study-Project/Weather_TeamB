import axios from 'axios';

// ✅ 임시 토큰 (로그인 구현 전까지 하드코딩)
const TEMP_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGdtYWlsLmNvbSIsImlhdCI6MTc1MDMyNjE2NywiZXhwIjoxNzUwMzI5NzY3fQ.lNcbeANGn4E958rt0XLolKW0caoNhGnKGJxgZr-2k3A';

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
        Authorization: TEMP_TOKEN,
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