//Context  API 사용해 전역적으로 인증상태 관리하는 역할

import React, { createContext, useState } from "react";

// 초기 authData 구조 정의
const defaultAuthData = {
  id: null,
  username: null,
  nickname: null,
  createdAt: null,
  role: null,
  token: localStorage.getItem("token") || null,
  isAdmin: false,
};

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem("authData");
    let initialAuthData = storedAuthData
      ? JSON.parse(storedAuthData)
      : defaultAuthData;

    // 관리자 여부 확인
    initialAuthData = {
      ...initialAuthData,
      isAdmin: initialAuthData.role === "ADMIN",
    };

    return initialAuthData;
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
