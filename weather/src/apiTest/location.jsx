// src/feat/weather/location.js

const locationMap = {
  // 서울
  "서울 종로구": { x: 60, y: 127 },
  "서울 강남구": { x: 61, y: 126 },
  "서울 강서구": { x: 58, y: 126 },

  // 부산
  "부산 해운대구": { x: 98, y: 76 },
  "부산 수영구": { x: 97, y: 75 },

  // 대구
  "대구 중구": { x: 89, y: 90 },
  "대구 수성구": { x: 89, y: 88 },

  // 인천
  "인천 연수구": { x: 55, y: 124 },
  "인천 부평구": { x: 54, y: 126 },

  // 광주
  "광주 북구": { x: 58, y: 74 },
  "광주 서구": { x: 57, y: 74 },

  // 대전
  "대전 유성구": { x: 67, y: 100 },
  "대전 서구": { x: 67, y: 99 },

  // 울산
  "울산 남구": { x: 102, y: 84 },
  "울산 북구": { x: 102, y: 87 },

  // 세종
  "세종특별자치시": { x: 66, y: 103 },

  // 경기 일부
  "수원시 장안구": { x: 60, y: 120 },
  "성남시 분당구": { x: 63, y: 123 },
  "고양시 일산동구": { x: 56, y: 128 },

  // 강원 일부
  "춘천시": { x: 73, y: 134 },
  "강릉시": { x: 92, y: 131 },

  // 충청 일부
  "청주시 상당구": { x: 69, y: 106 },
  "천안시 서북구": { x: 63, y: 110 },

  // 전라 일부
  "전주시 완산구": { x: 63, y: 89 },
  "광양시": { x: 75, y: 66 },

  // 경상 일부
  "창원시 의창구": { x: 91, y: 77 },
  "포항시 남구": { x: 102, y: 94 },

  // 제주
  "제주시": { x: 53, y: 38 },
  "서귀포시": { x: 52, y: 33 },
};

export default locationMap;
