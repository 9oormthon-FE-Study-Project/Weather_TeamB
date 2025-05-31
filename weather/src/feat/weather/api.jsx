import axios from "axios";

export const fetchWeather = async (x, y) => {
  const now = new Date();
  const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
  const getBaseTime = () => {
    let hour = now.getHours();
    hour = hour - (hour % 2);
    return hour.toString().padStart(2, '0') + '00';
  };

  const baseTime = getBaseTime();

  try {
    const response = await axios.get(
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
      {
        params: {
          serviceKey: 'l7F9H/Uh45pWfnjWKpd6N7OyHeazTbRzzqPgWUvEotU3EhDVbZTNFUUvR6p/cXoFcB0IuZlrR+T+xL/faSmKnA==',
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

    // 실패한 경우 체크
    if (data.response?.header?.resultCode !== '00') {
      throw new Error(data.response?.header?.resultMsg || 'API 응답 에러');
    }

    return data.response.body.items.item;

  } catch (error) {
    console.error("❌ API 호출 실패:", error);
    throw error;
  }
};
