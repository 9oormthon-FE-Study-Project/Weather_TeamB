import React from "react";
import Button from "../components/button"; //공통된 요소 버튼 사용


//sub page 화면 구현
const Subpage = () => {
  
  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-full">
      <h1 className="text-6xl font-bold mb-32 max-w-1/2 flex">Weatherpeek</h1>
      <div className="max-w-xl w-full flex flex-col gap-20">
        {/* max-w-xl = 최대 너비/ w-full= 최대너비에 맞춰서 */}
        <Button >날씨목록으로 가기</Button>
        <Button >날씨지도로 가기</Button>
      </div>
    </div>
  );
};

export default Subpage;