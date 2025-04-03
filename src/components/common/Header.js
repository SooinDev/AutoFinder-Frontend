import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/dark-mode-toggle.css';

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

    // 다크모드 토글 버튼 컴포넌트
    const DarkModeToggle = () => {
        return (
            <button
                className="toggle"
                aria-pressed={darkMode}
                onClick={toggleDarkMode}
                title={darkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
                style={{ '--width': 'clamp(40px, 10vmin, 60px)' }}
            >
                <span className="toggle__content">
                    <svg aria-hidden="true" className="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 290 228">
                        <g className="clouds">
                            <path fill="#D9D9D9" d="M335 147.5c0 27.89-22.61 50.5-50.5 50.5a50.78 50.78 0 0 1-9.29-.853c-2.478 12.606-10.595 23.188-21.615 29.011C245.699 243.749 228.03 256 207.5 256a50.433 50.433 0 0 1-16.034-2.599A41.811 41.811 0 0 1 166 262a41.798 41.798 0 0 1-22.893-6.782A42.21 42.21 0 0 1 135 256a41.82 41.82 0 0 1-19.115-4.592A41.84 41.84 0 0 1 88 262c-1.827 0-3.626-.117-5.391-.343C74.911 270.448 63.604 276 51 276c-23.196 0-42-18.804-42-42s18.804-42 42-42c1.827 0 3.626.117 5.391.343C64.089 183.552 75.396 178 88 178a41.819 41.819 0 0 1 19.115 4.592C114.532 176.002 124.298 172 135 172a41.798 41.798 0 0 1 22.893 6.782 42.066 42.066 0 0 1 7.239-.773C174.137 164.159 189.749 155 207.5 155c.601 0 1.199.01 1.794.031A41.813 41.813 0 0 1 234 147h.002c.269-27.66 22.774-50 50.498-50 27.89 0 50.5 22.61 50.5 50.5Z" />
                        </g>
                    </svg>
                    <span aria-hidden="true" className="pilot__container">
                        <span className="pilot-bear">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1448 938">
                                <mask id="pilot-mask" fill="#fff">
                                    <path fillRule="evenodd" d="M869.02 210.61c16.067-3.967 27.98-18.476 27.98-35.768C897 154.495 880.505 138 860.158 138c-14.337 0-26.761 8.19-32.85 20.146C815.313 151.674 801.586 148 787 148h-20c-14.52 0-28.19 3.641-40.146 10.059C720.749 146.15 708.351 138 694.048 138c-20.347 0-36.842 16.495-36.842 36.842 0 17.222 11.818 31.685 27.787 35.72A85.104 85.104 0 0 0 682 233v225c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22v-28.69a41.072 41.072 0 0 0 14 .174V458c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22v-74.797a28.992 28.992 0 0 0 6.946-5.137l44.548-44.548c11.325-11.325 11.325-29.687 0-41.012s-29.687-11.325-41.012 0L872 302.988V233a85.094 85.094 0 0 0-2.98-22.39Z" clipRule="evenodd"/>
                                </mask>
                                <path fill="#AF7128" fillRule="evenodd" d="M869.02 210.61c16.067-3.967 27.98-18.476 27.98-35.768C897 154.495 880.505 138 860.158 138c-14.337 0-26.761 8.19-32.85 20.146C815.313 151.674 801.586 148 787 148h-20c-14.52 0-28.19 3.641-40.146 10.059C720.749 146.15 708.351 138 694.048 138c-20.347 0-36.842 16.495-36.842 36.842 0 17.222 11.818 31.685 27.787 35.72A85.104 85.104 0 0 0 682 233v225c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22v-28.69a41.072 41.072 0 0 0 14 .174V458c0 12.15 9.85 22 22 22h44c12.15 0 22-9.85 22-22v-74.797a28.992 28.992 0 0 0 6.946-5.137l44.548-44.548c11.325-11.325 11.325-29.687 0-41.012s-29.687-11.325-41.012 0L872 302.988V233a85.094 85.094 0 0 0-2.98-22.39Z" clipRule="evenodd"/>
                                <path fill="#000" d="m869.02 210.61-5.789 1.577-1.614-5.929 5.965-1.473 1.438 5.825Zm-41.712-52.464 5.347 2.723-2.789 5.476-5.407-2.918 2.849-5.281Zm-100.454-.087 2.838 5.287-5.388 2.892-2.789-5.442 5.339-2.737Zm-41.861 52.503 1.47-5.817 5.928 1.498-1.61 5.899-5.788-1.58Z" mask="url(#pilot-mask)"/>
                                <path fill="#FF1E1E" d="M821.678 205.665h-88.371v13.25h88.371z"/>
                                <path fill="#000" fillRule="evenodd" d="M709.7 164.481c-17.939 14.394-28.018 37.148-28.018 57.504h61.648c.087-13.669 11.194-24.723 24.883-24.723h18.56c13.689 0 24.796 11.054 24.883 24.723H873c0-20.356-10.078-43.11-28.018-57.504C827.043 150.086 802.711 142 777.341 142c-25.37 0-49.701 8.086-67.641 22.481Z" clipRule="evenodd"/>
                                <circle cx="8.079" cy="8.079" r="8.079" fill="#000" transform="matrix(-1 0 0 1 730.414 240)"/>
                                <circle cx="8.079" cy="8.079" r="8.079" fill="#000" transform="matrix(-1 0 0 1 839 240)"/>
                                <path fill="#000" d="M755.835 262.683c0 8.21 9.868 17.451 20.845 17.451 10.977 0 20.845-9.241 20.845-17.451s-9.868-12.281-20.845-12.281c-10.977 0-20.845 4.071-20.845 12.281Z"/>
                            </svg>
                        </span>
                    </span>
                    <svg aria-hidden="true" className="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 290 228">
                        <g className="clouds">
                            <path fill="#fff" d="M328 167.5c0 15.214-7.994 28.56-20.01 36.068.007.31.01.621.01.932 0 23.472-19.028 42.5-42.5 42.5-3.789 0-7.461-.496-10.957-1.426C249.671 263.676 233.141 277 213.5 277a42.77 42.77 0 0 1-7.702-.696C198.089 284.141 187.362 289 175.5 289a42.338 42.338 0 0 1-27.864-10.408A42.411 42.411 0 0 1 133.5 281c-4.36 0-8.566-.656-12.526-1.876C113.252 287.066 102.452 292 90.5 292a42.388 42.388 0 0 1-15.8-3.034A42.316 42.316 0 0 1 48.5 298C25.028 298 6 278.972 6 255.5S25.028 213 48.5 213a42.388 42.388 0 0 1 15.8 3.034A42.316 42.316 0 0 1 90.5 207c4.36 0 8.566.656 12.526 1.876C110.748 200.934 121.548 196 133.5 196a42.338 42.338 0 0 1 27.864 10.408A42.411 42.411 0 0 1 175.5 204c2.63 0 5.204.239 7.702.696C190.911 196.859 201.638 192 213.5 192c3.789 0 7.461.496 10.957 1.426 2.824-10.491 9.562-19.377 18.553-24.994-.007-.31-.01-.621-.01-.932 0-23.472 19.028-42.5 42.5-42.5s42.5 19.028 42.5 42.5Z" />
                        </g>
                    </svg>
                    <span className="toggle__indicator-wrapper">
                        <span className="toggle__indicator">
                            <span className="toggle__star">
                                <span className="sun">
                                    <span className="moon">
                                        <span className="moon__crater"></span>
                                        <span className="moon__crater"></span>
                                        <span className="moon__crater"></span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>
                    <svg aria-hidden="true" className="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 290 228">
                        <g>
                            <g className="stars">
                                <g>
                                    <path fill="#fff" fillRule="evenodd" d="M61 11.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.749 3.749 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.749 3.749 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.749 3.749 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 61 11.5Z" clipRule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fillRule="evenodd" d="M41.5 74.219a.329.329 0 0 1 .315.238l.356 1.245a1.641 1.641 0 0 0 1.127 1.127l1.245.356a.328.328 0 0 1 0 .63l-1.245.356a1.641 1.641 0 0 0-1.127 1.127l-.356 1.245a.328.328 0 0 1-.63 0l-.356-1.245a1.641 1.641 0 0 0-1.127-1.127l-1.245-.356a.328.328 0 0 1 0-.63l1.245-.356a1.641 1.641 0 0 0 1.127-1.127l.356-1.245a.328.328 0 0 1 .315-.238Z" clipRule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fillRule="evenodd" d="M110.5 53.156a.236.236 0 0 1 .225.17l.254.89a1.174 1.174 0 0 0 .805.805l.89.254a.23.23 0 0 1 .122.084.233.233 0 0 1-.122.366l-.89.254a1.167 1.167 0 0 0-.805.805l-.254.89a.232.232 0 0 1-.225.17.235.235 0 0 1-.225-.17l-.254-.89a1.174 1.174 0 0 0-.805-.805l-.89-.254a.23.23 0 0 1-.122-.084.233.233 0 0 1 .122-.366l.89-.254a1.167 1.167 0 0 0 .805-.805l.254-.89a.232.232 0 0 1 .225-.17Z" clipRule="evenodd" />
                                </g>
                                <g>
                                    <path fill="#fff" fillRule="evenodd" d="M147 60.25a.377.377 0 0 1 .36.272l.407 1.423a1.883 1.883 0 0 0 1.288 1.288l1.423.407a.375.375 0 0 1 0 .72l-1.423.407a1.875 1.875 0 0 0-1.288 1.288l-.407 1.423a.371.371 0 0 1-.36.272.377.377 0 0 1-.36-.272l-.407-1.423a1.883 1.883 0 0 0-1.288-1.288l-1.423-.406a.375.375 0 0 1 0-.722l1.423-.406a1.875 1.875 0 0 0 1.288-1.288l.407-1.423a.372.372 0 0 1 .36-.272Z" clipRule="evenodd" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span className="astrobear__container">
                        <span className="astrobear">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 316 432">
                                <circle cx="158" cy="143" r="140" fill="#444" />
                                <circle cx="158" cy="143" r="140" stroke="#000" strokeWidth="6" />
                                <path fill="#AF7128" fillRule="evenodd" d="M65.98 159.61C49.913 155.643 38 141.134 38 123.842 38 103.495 54.495 87 74.842 87c14.337 0 26.761 8.19 32.85 20.146C119.687 100.674 133.414 97 148 97h20c14.52 0 28.19 3.641 40.146 10.059C214.251 95.15 226.65 87 240.952 87c20.347 0 36.842 16.495 36.842 36.842 0 17.222-11.818 31.685-27.787 35.72A85.104 85.104 0 0 1 253 182v66.56l10.054-10.054c11.325-11.325 29.687-11.325 41.012 0s11.325 29.687 0 41.012l-44.548 44.548a29.004 29.004 0 0 1-6.518 4.906V407c0 12.15-9.85 22-22 22h-44c-12.15 0-22-9.85-22-22v-28.69a41.072 41.072 0 0 1-14 .174V407c0 12.15-9.85 22-22 22H85c-12.15 0-22-9.85-22-22v-77.797a28.99 28.99 0 0 1-6.946-5.137l-44.548-44.548c-11.325-11.325-11.325-29.687 0-41.012 11.326-11.325 29.687-11.325 41.013 0L63 248.988V182a85.106 85.106 0 0 1 2.98-22.39Z" clipRule="evenodd" />
                                <path fill="#000" d="m65.98 159.61 2.894.789a3.002 3.002 0 0 0-2.175-3.701l-.72 2.912Z" />
                                <path fill="#FF1E1E" d="M113.322 154.665h88.371v13.25h-88.371z"/>
                                <path fill="#000" fillRule="evenodd" d="M225.3 113.481c17.939 14.394 28.018 37.148 28.018 57.504H191.67c-.087-13.669-11.194-24.723-24.883-24.723h-18.56c-13.689 0-24.796 11.054-24.883 24.723H62c0-20.356 10.078-43.11 28.018-57.504C107.957 99.087 132.289 91 157.659 91c25.37 0 49.701 8.087 67.641 22.481Z" clipRule="evenodd" />
                                <circle cx="212.665" cy="197.079" r="8.079" fill="#000" />
                                <circle cx="104.079" cy="197.079" r="8.079" fill="#000" />
                                <path fill="#000" d="M179.165 211.683c0 8.21-9.868 17.451-20.845 17.451-10.977 0-20.845-9.241-20.845-17.451 0-8.211 9.868-12.281 20.845-12.281 10.977 0 20.845 4.07 20.845 12.281Z" />
                            </svg>
                        </span>
                    </span>
                </span>
            </button>
        );
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
                        {/* 다크 모드 토글 버튼 - 여기서 새로운 토글 컴포넌트 사용 */}
                        <div className="ml-3 relative">
                            <DarkModeToggle />
                        </div>

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
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white">
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
                            <DarkModeToggle />
                            <span className="ml-2 text-base font-medium text-gray-600 dark:text-gray-300">
                                {darkMode ? "라이트 모드" : "다크 모드"}
                            </span>
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