// 로그인한 사용자만 접근할수 있게 페이지 보호기능

import React, { Children } from "react";
import { Navigate } from "react-router";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({Children})=> {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    if (!isLoggedIn) {
        // 로그인하지 않은 사용자는 로그인 페이지로 돌아가도록
        return <Navigate to="/login" replace />;
    }
    return Children;

};

export default ProtectedRoute;