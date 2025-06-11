import React from "react";
import Button from "../components/button"; //공통된 요소 버튼 사용
import { useNavigate } from "react-router"; //페이지 이동을 위한 useNavigate 훅 사용

//서브페이지 화면 구현
// 날씨 지도랑 목록으로 이동할수 있게하는 페이지
const Subpage = () => {
  const navigate = useNavigate(); //useNavigate 훅을 사용하여 페이지 이동 기능을 활성화
  
  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-full">
      <h1 className="text-6xl font-bold mb-32 max-w-1/2 flex">Weatherpeek</h1>
      <div className="max-w-xl w-full flex flex-col gap-20">
        {/* max-w-xl = 최대 너비/ w-full= 최대너비에 맞춰서 */}
        <Button >날씨목록으로 가기</Button>
        <Button onClick={()=> {navigate('/map')}}>날씨지도로 가기</Button>
      </div>
    </div>
  );
};

export default Subpage;