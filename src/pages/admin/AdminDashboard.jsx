import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalCars: 0,
        totalUsers: 0,
        totalFavorites: 0,
        recentCars: []
    });
    const [isLoading, setIsLoading] = useState(true);

    // 통계 데이터를 가져오는 함수 (실제 구현 시 API 호출 추가)
    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);

            try {
                // 실제 구현 시 아래 코드를 API 호출로 대체
                // const response = await axios.get(`${API_BASE_URL}/admin/stats`, getAuthHeaders());
                // setStats(response.data);

                // 예시 데이터 (실제 구현 시 삭제)
                setTimeout(() => {
                    setStats({
                        totalCars: 253,
                        totalUsers: 48,
                        totalFavorites: 127,
                        recentCars: [
                            { id: 1, model: '현대 그랜저', price: 3500, createdAt: '2023-10-12T14:20:00' },
                            { id: 2, model: '기아 K5', price: 2800, createdAt: '2023-10-11T10:15:00' },
                            { id: 3, model: '볼보 XC60', price: 4500, createdAt: '2023-10-10T16:30:00' },
                            { id: 4, model: '테슬라 모델 3', price: 5200, createdAt: '2023-10-09T09:45:00' },
                        ]
                    });
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error('통계 데이터 로드 오류:', error);
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // 관리자 메뉴 항목
    const adminMenuItems = [
        { name: '차량 관리', icon: 'car', path: '/admin/cars', description: '차량 추가, 수정, 삭제' },
        { name: '회원 관리', icon: 'users', path: '/admin/users', description: '회원 목록 및 관리' },
        { name: '통계', icon: 'chart', path: '/admin/stats', description: '사이트 사용 통계' },
        { name: '설정', icon: 'settings', path: '/admin/settings', description: '사이트 설정' }
    ];

    // 아이콘 컴포넌트
    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'car':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                );
            case 'users':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            case 'chart':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                );
            case 'settings':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">관리자 대시보드</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">오토파인더 관리 시스템에 오신 것을 환영합니다.</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <svg className="animate-spin h-10 w-10 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ) : (
                <>
                    {/* 통계 카드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-teal-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">등록된 차량</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalCars}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">총 회원수</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalUsers}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">즐겨찾기 등록수</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalFavorites}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">오늘 방문자</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900 dark:text-white">42</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메뉴 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {adminMenuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md p-3">
                                            {renderIcon(item.icon)}
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* 최근 등록된 차량 */}
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-8">
                        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">최근 등록된 차량</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">최근에 추가된 차량 목록입니다.</p>
                            </div>
                            <Link
                                to="/admin/cars"
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900 hover:bg-teal-200 dark:hover:bg-teal-800"
                            >
                                모든 차량 보기
                            </Link>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {stats.recentCars.map((car) => (
                                    <li key={car.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{car.model}</div>
                                                <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">{car.price?.toLocaleString() || 0} 만원</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(car.createdAt)}</div>
                                                <Link
                                                    to={`/cars/${car.id}`}
                                                    className="ml-4 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300"
                                                >
                                                    보기
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;