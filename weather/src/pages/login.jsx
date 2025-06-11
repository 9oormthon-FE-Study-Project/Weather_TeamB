import React  from "react";
import Button from "../components/button"; //공통된 요소 버튼 사용
import { Link, useNavigate } from "react-router"; //페이지 이동을 위한 useNavigate 훅 사용
import { useLoginValidation } from "../hooks/useLoginValidation";
import useAuthStore from "../store/authStore"; //로그인 상태를 관리하기 위한 Zustand 전역상태
import { useForm } from "react-hook-form";


//로그인 page 화면 구현
const LoginPage = () => {
  const navigate = useNavigate();
  const { validateID, validatePassword } = useLoginValidation();

  const login = useAuthStore((state) => state.login); // Zustand에서 로그인 함수 가져오기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  // 로그인 시도하는 코드
  const onSubmit = (data) => {
    login({ id: data.id }); // 사용자 정보 저장
    alert("로그인 성공하였습니다");
    navigate("/sub"); // 서브 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <h1 className="text-6xl font-bold mb-32 max-w-1/2 flex">Weatherpeek</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full max-w-xl px-6"
      >
        {/* 아이디 입력 */}
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          {...register("id", {
            required: "아이디를 입력해주세요.",
            validate: validateID,
          })}
          className="border border-gray-300 rounded-lg p-4 text-2xl"
        />
        {errors.id && (
          <p className="text-red-500 text-lg">{errors.id.message}</p>
        )}

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            validate: validatePassword,
          })}
          className="border border-gray-300 rounded-lg p-4 text-2xl"
        />
        {errors.password && (
          <p className="text-red-500 text-lg">{errors.password.message}</p>
        )}

        {/* 로그인 버튼 */}
        <Button type="submit">로그인하기</Button>

        {/* 회원가입 링크 */}
        <p className="text-center text-gray-500 text-xl mt-4">
          계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="text-black font-semibold hover:underline"
          >
            회원가입하기
          </Link>
        </p>
      </form>
    </div>
  );
};



  
  export default LoginPage;

  