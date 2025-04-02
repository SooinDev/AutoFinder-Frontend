import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = ({ userId, setUserId, setFavorites }) => {
    const history = useHistory();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");

        if (typeof setFavorites === 'function') {
            setFavorites(new Set());
        }

        setUserId(null);
        history.push("/login");
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <Link to="/" className="ml-2 text-xl font-bold text-gray-900">
                                AutoFinder
                            </Link>
                        </div>
                    </div>

                    {token ? (
                        <div className="flex items-center">
                            <div className="hidden md:ml-6 md:flex md:space-x-8">
                                <Link to="/" className="border-teal-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    홈
                                </Link>
                                <Link to="/favorites" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    즐겨찾기
                                </Link>
                                <Link to="/profile" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    내 정보
                                </Link>
                            </div>
                            <div className="ml-4 flex items-center">
                                <span className="text-sm text-gray-500 mr-3">
                                    <span className="mr-1">안녕하세요,</span>
                                    <strong className="text-gray-900">{userId || "사용자"}</strong>
                                    <span>님</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-teal-700"
                                >
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                                로그인
                            </Link>
                            <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-teal-700">
                                회원가입
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;