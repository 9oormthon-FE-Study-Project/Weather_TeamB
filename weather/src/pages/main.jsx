import React from "react";
import Button from "../components/button"; //공통된 요소 버튼 사용
import { useNavigate } from "react-router-dom"; //페이지 이동을 위한 useNavigate 훅 사용

//main page 화면 구현
const Mainpage = () => {
  const navigate = useNavigate(); //useNavigate 훅을 사용하여 페이지 이동 기능을 활성화
  return (
    <div className="flex flex-col items-center justify-center max-w-screen h-full">
      <h1 className="text-6xl font-bold mb-32 max-w-1/2 flex">Weatherpeek</h1>
      <div className="max-w-xl w-full flex flex-col gap-10">
        {/* max-w-xl = 최대 너비/ w-full= 최대너비에 맞춰서 */}
        <Button onClick={()=> {navigate('/login')} }>로그인하기</Button>
        <Button onClick={()=> {navigate('/signup')} }>회원가입하기</Button>
      </div>
    </div>
  );
};

export default Mainpage;
