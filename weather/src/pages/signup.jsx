import React from "react";
import Button from "../components/button"; //공통된 요소 버튼 사용
import { useNavigate, Link } from "react-router-dom"; //페이지 이동을 위한 useNavigate 훅 사용

//회원가입 page 화면 구현
const SignupPage = () => {
    const navigate = useNavigate();

    //입력상태관리
    const [id, setId] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [confirmPw, setConfirmPw] = React.useState('');

    // 가입하기 버튼 누르면 로그인페이지로 이동시키는 코드
    const onCLickConfirmButton =()=>{
      if (pw !== confirmPw) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      alert('회원가입이 완료되었습니다.')
      navigate('/login');
    }


    return (
        <div className="flex flex-col items-center justify-center max-w-screen h-full">
          <h1 className="text-6xl font-bold mb-32 max-w-1/2 flex">Weatherpeek</h1>
          <div className="max-w-xl w-full flex flex-col gap-10">
            {/* max-w-xl = 최대 너비/ w-full= 최대너비에 맞춰서 */}
            <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 text-2xl"
            />

            <input
            type="text"
            placeholder="비밀번호를 입력하세요"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 text-2xl"
            />
            
            <input
            type="text"
            placeholder="비밀번호를 확인하세요"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 text-2xl"
            />
            
            <Button onClick={onCLickConfirmButton}>회원가입하기</Button>


            <p className="text-gray-500 text-center mt-4"> 
              계정이 있으신가요??{""}
              <Link to="/login" className=" text-black font-semibold hover:underline">
                  로그인하기
              </Link>
            
            </p>


          </div>
        </div>
      );
    };
    


export default SignupPage;