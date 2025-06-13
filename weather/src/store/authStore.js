import {create} from 'zustand';


//Zustand를 이용한 전역 로그인 상태 저장소
const useAuthStore = create((set) => ({
    //로그인 여부
    isLoggedIn: false,
    //로그인하는 사용자 정보
    user: null,

    //로그인 처리하는 함수
    login:(userData)=>
        set(()=>({
            isLoggedIn: true,
            user: userData,
        })),
    //로그아웃 처리하는 함수입니다
    logout: () =>
        set(()=>({
            isLoggedIn: false,
            user: null,
        })),
    }));

export default useAuthStore;