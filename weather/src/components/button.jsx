//공통된 버튼 요소

import React from "react";

const Button = ({ onClick,children,style}) =>{
    return(
        <button
        onClick={onClick}
        className="w-full bg-gray-400 text-black rounded-4xl px-4 py-2  text-3xl hover:bg-gray-300 transition"
        style={style}
        // px-4: 좌우 여백, py-2: 상하 여백, rounded-2xl: 둥근 모서리, font-semibold: 글씨 두께
        // transition: 부드러운 전환 효과
        >
            {children}
        </button>
    )
}

export default Button;



