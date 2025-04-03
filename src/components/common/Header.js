import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const Header = ({ userId, username, setUserId, setUsername, setFavorites }) => {
    const history = useHistory();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username"); // username도 함께 제거
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username"); // username도 함께 제거

        if (typeof setFavorites === 'function') {
            setFavorites(new Set());
        }

        setUserId(null);
        setUsername(null); // username 상태 초기화
        history.push("/");
    };

    // 사용자 이름의 첫 글자 가져오기 (프로필 아이콘에 표시)
    const getInitial = () => {
        if (username && typeof username === 'string' && username.length > 0) {
            return username.charAt(0).toUpperCase();
        }
        return 'U'; // 기본값
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            <Link to="/" className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                                AutoFinder
                            </Link>
                        </div>

                        {/* 로그인 상태에 따른 네비게이션 */}
                        <nav className="hidden md:ml-8 md:flex md:space-x-8">
                            <Link to="/"
                                  className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                홈
                            </Link>
                            <Link to="/cars"
                                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                                차량 검색
                            </Link>
                            <Link to="/analysis"
                                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                                시장 분석
                            </Link>
                            {token && (
                                <>
                                    <Link to="/favorites"
                                          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                                        즐겨찾기
                                    </Link>
                                    <Link to="/notifications"
                                          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                                        알림
                                    </Link>
                                </>
                            )}
                            <Link to="/help"
                                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                                이용 안내
                            </Link>
                        </nav>
                    </div>

                    {/* 로그인 상태에 따른 우측 메뉴 */}
                    <div className="flex items-center">
                        {/* 다크 모드 토글 버튼 */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 ml-3 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            aria-label={darkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
                        >
                            {darkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {token ? (
                            <div className="flex items-center">
                                {/* 사용자 프로필 드롭다운 */}
                                <div className="ml-3 relative">
                                    <div className="flex items-center">
                                        <button
                                            className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                            onClick={() => history.push('/profile')}
                                        >
                                            <div
                                                className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                                                {getInitial()}
                                            </div>
                                            <span className="ml-2 text-gray-700 dark:text-gray-300 hidden md:block">
                                                {username || "사용자"}님
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="ml-4 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-sm font-medium">
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
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
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
                <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="block pl-3 pr-4 py-2 border-l-4 border-teal-500 text-base font-medium text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900 dark:bg-opacity-25"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            홈
                        </Link>
                        <Link
                            to="/cars"
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            차량 검색
                        </Link>
                        {token && (
                            <>
                                <Link
                                    to="/favorites"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    즐겨찾기
                                </Link>
                                <Link
                                    to="/notifications"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    알림
                                </Link>
                            </>
                        )}
                        <Link
                            to="/help"
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            이용 안내
                        </Link>
                        <div className="flex items-center pl-3 pr-4 py-2">
                            <button
                                onClick={() => {
                                    toggleDarkMode();
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center text-base font-medium text-gray-600 dark:text-gray-300"
                            >
                                {darkMode ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        라이트 모드
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                        다크 모드
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                        {token ? (
                            <>
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
                                            {getInitial()}
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800 dark:text-white">{username || "사용자"}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        내 프로필
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="px-4 flex flex-col space-y-2">
                                <Link
                                    to="/login"
                                    className="block text-center w-full px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
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