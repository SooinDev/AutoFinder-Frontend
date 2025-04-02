import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFavorites } from '../api/services';

const UserDashboard = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [recentSearches, setRecentSearches] = useState([]);
    const [notifications, setNotifications] = useState([
        { id: 1, title: '관심 차량 가격 변동', message: '관심 등록한 현대 쏘나타의 가격이 100만원 하락했습니다.', time: '1시간 전', isRead: false },
        { id: 2, title: '새로운 매물 알림', message: '검색 조건에 맞는 신규 매물 3건이 등록되었습니다.', time: '어제', isRead: true }
    ]);

    useEffect(() => {
        // 즐겨찾기 데이터 로드
        if (userId) {
            const loadFavorites = async () => {
                setIsLoading(true);
                try {
                    const data = await fetchFavorites(userId);
                    setFavorites(data.slice(0, 3)); // 최대 3개만 표시
                } catch (error) {
                    console.error('즐겨찾기 로드 실패:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            // localStorage에서 최근 검색 기록 로드
            const loadRecentSearches = () => {
                try {
                    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
                    setRecentSearches(searches.slice(0, 3)); // 최대 3개만 표시
                } catch (error) {
                    console.error('최근 검색 기록 로드 실패:', error);
                }
            };

            loadFavorites();
            loadRecentSearches();
        }
    }, [userId]);

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
                <h2 className="text-lg font-medium text-white">{userId && typeof userId === 'string' ? userId : '사용자'}님의 대시보드</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* 즐겨찾기 섹션 */}
                <div className="col-span-1">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        내 즐겨찾기
                    </h3>

                    {isLoading ? (
                        <div className="animate-pulse space-y-3">
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                    ) : favorites.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {favorites.map((car) => (
                                <li key={car.id} className="py-2">
                                    <Link to={`/cars/${car.id}`} className="block hover:bg-gray-50 group transition duration-150">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded overflow-hidden">
                                                {car.imageUrl && (
                                                    <img src={car.imageUrl} alt={car.model} className="h-full w-full object-cover" />
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900 group-hover:text-teal-600">{car.model}</p>
                                                <p className="text-xs text-gray-500">{car.price?.toLocaleString() ?? "정보 없음"} 만원 • {car.year}년식</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">즐겨찾기한 차량이 없습니다.</p>
                            <Link to="/cars" className="text-xs text-teal-600 hover:text-teal-800 mt-1 inline-block">
                                차량 검색하러 가기
                            </Link>
                        </div>
                    )}

                    {favorites.length > 0 && (
                        <Link to="/favorites" className="mt-3 block text-sm text-center text-teal-600 hover:text-teal-800">
                            모든 즐겨찾기 보기
                        </Link>
                    )}
                </div>

                {/* 최근 검색 기록 섹션 */}
                <div className="col-span-1">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        최근 검색 기록
                    </h3>

                    {recentSearches.length > 0 ? (
                        <ul className="space-y-2">
                            {recentSearches.map((search, index) => (
                                <li key={index} className="bg-gray-50 px-3 py-2 rounded-md">
                                    <Link to={`/cars?${search.params}`} className="block hover:text-teal-600">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-900">{search.label || "검색 기록"}</p>
                                                <p className="text-xs text-gray-500">
                                                    {search.filters?.model && `${search.filters.model}, `}
                                                    {search.filters?.year && `${search.filters.year}년식, `}
                                                    {search.filters?.minPrice && search.filters?.maxPrice &&
                                                        `${search.filters.minPrice}~${search.filters.maxPrice}만원`}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-400">{search.date}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">최근 검색 기록이 없습니다.</p>
                            <Link to="/cars" className="text-xs text-teal-600 hover:text-teal-800 mt-1 inline-block">
                                차량 검색하러 가기
                            </Link>
                        </div>
                    )}
                </div>

                {/* 알림 섹션 */}
                <div className="col-span-1">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        알림
                    </h3>

                    {notifications.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {notifications.map((notification) => (
                                <li key={notification.id} className={`py-2 ${!notification.isRead ? 'bg-teal-50' : ''}`}>
                                    <div className="block">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                            <p className="text-xs text-gray-500">{notification.time}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">새로운 알림이 없습니다.</p>
                        </div>
                    )}

                    {notifications.length > 0 && (
                        <Link to="/notifications" className="mt-3 block text-sm text-center text-teal-600 hover:text-teal-800">
                            모든 알림 보기
                        </Link>
                    )}
                </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <Link to="/profile" className="text-sm text-teal-600 hover:text-teal-800">
                    내 프로필 관리
                </Link>
            </div>
        </div>
    );
};

export default UserDashboard;