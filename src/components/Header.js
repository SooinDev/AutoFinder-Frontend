import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = ({ userId, setUserId, setFavorites }) => {
    const history = useHistory();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");

        if (typeof setFavorites === 'function') {
            setFavorites(new Set());
        }

        setUserId(null);
        history.push("/");
    };

    return (
        <header className="bg-white shadow-sm">
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

                        {/* 로그인 상태에 따른 네비게이션 */}
                        <nav className="hidden md:ml-8 md:flex md:space-x-8">
                            <Link to="/" className="text-gray-900 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                홈
                            </Link>
                            <Link to="/cars" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                차량 검색
                            </Link>
                            {token && (
                                <>
                                    <Link to="/favorites" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                        즐겨찾기
                                    </Link>
                                    <Link to="/notifications" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                        알림
                                    </Link>
                                </>
                            )}
                            <Link to="/help" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                이용 안내
                            </Link>
                        </nav>
                    </div>

                    {/* 로그인 상태에 따른 우측 메뉴 */}
                    <div className="flex items-center">
                        {token ? (
                            <div className="flex items-center">
                                {/* 사용자 프로필 드롭다운 */}
                                <div className="ml-3 relative">
                                    <div className="flex items-center">
                                        <button
                                            className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                            onClick={() => history.push('/profile')}
                                        >
                                            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                                                {userId && typeof userId === 'string' ? userId.charAt(0)?.toUpperCase() : 'U'}
                                            </div>
                                            <span className="ml-2 text-gray-700 hidden md:block">
                                                {userId || "사용자"}님
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="ml-4 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                                        >
                                            로그아웃
                                        </button>
                                    </div>
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

                        {/* 모바일 메뉴 버튼 */}
                        <div className="-mr-2 flex items-center md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                                aria-expanded="false"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <span className="sr-only">메뉴 열기</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="block pl-3 pr-4 py-2 border-l-4 border-teal-500 text-base font-medium text-teal-700 bg-teal-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            홈
                        </Link>
                        <Link
                            to="/cars"
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            차량 검색
                        </Link>
                        {token && (
                            <>
                                <Link
                                    to="/favorites"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    즐겨찾기
                                </Link>
                                <Link
                                    to="/notifications"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    알림
                                </Link>
                            </>
                        )}
                        <Link
                            to="/help"
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            이용 안내
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {token ? (
                            <>
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
                                            {userId && typeof userId === 'string' ? userId.charAt(0)?.toUpperCase() : 'U'}
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{userId || "사용자"}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        내 프로필
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="px-4 flex flex-col space-y-2">
                                <Link
                                    to="/login"
                                    className="block text-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/register"
                                    className="block text-center w-full px-4 py-2 text-base font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;