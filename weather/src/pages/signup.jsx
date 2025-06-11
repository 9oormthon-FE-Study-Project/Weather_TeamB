import React from "react";
import Button from "../components/button"; //공통된 요소 버튼 사용
import { useNavigate, Link } from "react-router"; //페이지 이동을 위한 useNavigate 훅 사용
import { useForm } from "react-hook-form";
import { useLoginValidation } from "../hooks/useLoginValidation";


//회원가입 page 화면 구현
const SignupPage = () => {
    const navigate = useNavigate();
    const { validateID, validatePassword } = useLoginValidation();
    
    const { register, handleSubmit, watch ,formState: { errors } } = useForm();

    const onSubmit = () => {
      alert("회원가입 되었습니다.");
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    };
    
    //비밀번호 일치했을때, 확인용 값
    const password=watch("password");


    return (
        <div className="flex flex-col items-center justify-center max-w-screen h-full">
          <h1 className="text-6xl font-bold mb-32 max-w-1/2 flex">Weatherpeek</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full flex flex-col gap-10">
            {/* max-w-xl = 최대 너비/ w-full= 최대너비에 맞춰서 */}
            <input
            type="text"
            placeholder="아이디를 입력하세요."
            {...register("id", {
              required: "아이디는 입력해주세요.",
              validate: validateID
            })}
            className="border border-gray-300 rounded-lg p-4 text-2xl"
            />
            {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
            {/* 아이디 유효성 검사 실패시 에러 메시지 출력 */}

            <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password", {
              required: "비밀번호는 입력해주세요.",
              validate: validatePassword
            })}
            className="border border-gray-300 rounded-lg p-4 text-2xl"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            {/* 비밀번호 유효성 검사 실패시 에러 메시지 출력 */}

            {/* 비밀번호 확인용*/}
            
            <input
            type="password"
            placeholder="비밀번호를 확인하세요"
            {...register("confirmPassword", {
              required: "비밀번호 확인은 필수입니다.",
              validate: value => value === password || "비밀번호가 일치하지 않습니다."
            })}
            className="border border-gray-300 rounded-lg p-4 text-2xl"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            {/* 비밀번호 확인 유효성 검사 실패시 에러 메시지 출력 */}

            
            <Button type="submit">회원가입하기</Button>
            {/* form이 제출됨 why type을 submit로 했기 때문 */}


            <p className="text-gray-500 text-center text-xl mt-4"> 
              계정이 있으신가요??{""}
              <Link to="/login" className=" text-black font-semibold hover:underline">
                  로그인하기
              </Link>
            
            </p>


          </form>
        </div>
      );
    };
    


export default SignupPage;