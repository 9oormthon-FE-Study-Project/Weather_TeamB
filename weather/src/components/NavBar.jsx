import { IoIosArrowBack } from "react-icons/io";
import { IoIosHome } from "react-icons/io";

import { useNavigate } from "react-router"; // React Router를 사용한다고 가정

export default function NavBar() { 
    const navigate = useNavigate();

    const category = [
        { icon: <IoIosArrowBack size={50} />, action: () => navigate(-1) }, // 이전 페이지로 이동
        { icon: <IoIosHome size={50} />, action: () => navigate("/") } // 메인 페이지로 이동
    ];

    return (
        <nav className="bg-white py-4 absolute top-0 left-0">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-around">
                    {category.map((item, idx) => (
                        <div 
                            className="text-black-400 hover:text-black-600 px-3 py-2 rounded-md font-medium cursor-pointer"
                            key={idx}
                            onClick={item.action} // 클릭 이벤트 추가
                        >
                            {item.icon}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}