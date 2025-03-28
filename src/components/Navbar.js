import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userId, setUserId, setFavorites }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");  // JWT 삭제
        localStorage.removeItem("userId"); // userId 삭제

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");

        setFavorites(new Set()); // 즐겨찾기 초기화
        setUserId(null); // userId 초기화

        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between">
            <Link to="/" className="text-white font-bold">AutoFinder</Link>
            <div>
                {token ? (
                    <>
                        <span className="text-white mr-4">ID: {userId || "알 수 없음"}</span>
                        <button onClick={handleLogout} className="text-white">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white mr-4">로그인</Link>
                        <Link to="/register" className="text-white">회원가입</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;