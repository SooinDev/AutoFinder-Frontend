import React, { useState, useEffect } from 'react';
import { fetchCars, fetchFavorites, toggleFavorite } from '../api/services';
import CarFilters from '../components/car/CarFilters';
import CarCard from '../components/car/CarCard';
import Pagination from '../components/common/Pagination';
import { useHistory, useLocation } from 'react-router-dom';

const CarListPage = ({ userId, favorites, setFavorites, isHomePage }) => {
    const history = useHistory();
    const location = useLocation();
    const [cars, setCars] = useState([]);
    const [favoriteCars, setFavoriteCars] = useState([]); // 즐겨찾기한 차량 데이터 저장
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({
        model: "", minPrice: "", maxPrice: "", minMileage: "", maxMileage: "", fuel: "", region: "", year: ""
    });

    // URL 쿼리 파라미터 파싱
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        // 페이지 정보 파싱
        const page = queryParams.get('page');
        if (page !== null) {
            setCurrentPage(parseInt(page) - 1); // URL은 1부터 시작, 내부 상태는 0부터 시작
        }

        // 필터 정보 파싱
        const newFilters = { ...filters };
        for (const key of Object.keys(filters)) {
            const value = queryParams.get(key);
            if (value !== null) {
                newFilters[key] = value;
            }
        }
        setFilters(newFilters);

        // 탭 정보 파싱
        const tab = queryParams.get('tab');
        if (tab === 'favorite') {
            setActiveTab('favorite');
        } else {
            setActiveTab('all');
        }
    }, [location.search]);

    // URL 업데이트 함수
    const updateUrl = (page, tab, newFilters) => {
        const params = new URLSearchParams();

        // 페이지 정보 추가 (1부터 시작하도록 변환)
        if (page !== undefined && page > 0) {
            params.append('page', page + 1);
        }

        // 탭 정보 추가
        if (tab === 'favorite') {
            params.append('tab', 'favorite');
        }

        // 필터 정보 추가 (값이 있는 필터만)
        const filtersToUse = newFilters || filters;
        for (const [key, value] of Object.entries(filtersToUse)) {
            if (value) {
                params.append(key, value);
            }
        }

        // 히스토리 업데이트 (URL 변경)
        const newUrl = `/cars?${params.toString()}`;
        history.push(newUrl);
    };

    // 차량 목록 불러오기
    const loadCars = async () => {
        if (isHomePage) return; // 홈페이지에서는 별도 처리

        setIsLoading(true);
        setError(null);

        try {
            const pageSize = 21;
            const data = await fetchCars(filters, currentPage, pageSize);

            // 모든 차량 데이터 저장
            setCars(data.content || []);
            setTotalPages(data.totalPages || 1);

            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            setError("차량 목록을 불러오는 데 실패했습니다.");
            console.error("차량 목록 로드 실패:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // 즐겨찾기 목록 불러오기
    const loadFavorites = async () => {
        if (!userId) {
            setFavorites(new Set());
            setFavoriteCars([]);
            return;
        }

        try {
            const favoritesData = await fetchFavorites(userId);
            // ID 집합으로 즐겨찾기 저장 (빠른 조회용)
            setFavorites(new Set(favoritesData.map(car => car.id)));

            // 즐겨찾기 차량 전체 데이터 저장
            setFavoriteCars(favoritesData || []);
        } catch (err) {
            console.error("즐겨찾기 로드 실패:", err);
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        updateUrl(newPage, activeTab, filters);
    };

    // 탭 변경 핸들러
    const handleTabChange = (tab) => {
        if (tab === 'favorite' && !userId) {
            alert('로그인이 필요합니다.');
            return;
        }

        setActiveTab(tab);
        setCurrentPage(0); // 탭 변경 시 1페이지로 초기화
        updateUrl(0, tab, filters);
    };

    // 검색 기능
    const handleSearch = () => {
        setCurrentPage(0);
        updateUrl(0, activeTab, filters);
        loadCars();
    };

    // 필터 초기화
    const handleResetFilters = () => {
        const resetFilters = {
            model: "", minPrice: "", maxPrice: "", minMileage: "", maxMileage: "", fuel: "", region: "", year: ""
        };
        setFilters(resetFilters);
        setCurrentPage(0);
        updateUrl(0, activeTab, resetFilters);
        setTimeout(() => loadCars(), 0);
    };

    // 즐겨찾기 토글
    const handleToggleFavorite = async (carId) => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await toggleFavorite(carId, userId, favorites.has(carId));

            // 즐겨찾기 상태 업데이트
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(carId)) {
                    newFavorites.delete(carId);
                } else {
                    newFavorites.add(carId);
                }
                return newFavorites;
            });

            // 즐겨찾기 차량 데이터 업데이트
            // 추가 또는 삭제 후 즐겨찾기 목록 새로고침
            loadFavorites();
        } catch (err) {
            console.error("즐겨찾기 업데이트 실패:", err);
            alert("즐겨찾기 처리 중 오류가 발생했습니다.");
        }
    };

    // 즐겨찾기 탭의 페이지네이션을 위한 데이터 계산
    const getFavoritePageData = () => {
        const pageSize = 21;

        // 전체 즐겨찾기 차량에서 현재 페이지에 해당하는 차량만 계산
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageItems = favoriteCars.slice(startIndex, endIndex);

        // 전체 페이지 수 계산
        const totalFavoritePages = Math.ceil(favoriteCars.length / pageSize) || 1;

        return {
            items: currentPageItems,
            totalPages: totalFavoritePages
        };
    };

    // 페이지, 필터, 탭 변경 시 데이터 로드
    useEffect(() => {
        if (!isHomePage) {
            if (activeTab === 'all') {
                loadCars();
            }
        }
    }, [currentPage, activeTab, isHomePage]);

    // 사용자 ID 변경 시 즐겨찾기 로드
    useEffect(() => {
        if (userId) {
            loadFavorites();
        } else {
            setFavorites(new Set());
            setFavoriteCars([]);
        }
    }, [userId]);

    // 홈페이지 내 간소화된 UI
    if (isHomePage) {
        return (
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center">
                        <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <>
                        {cars.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map(car => (
                                    <CarCard
                                        key={car.id}
                                        car={car}
                                        isFavorite={favorites.has(car.id)}
                                        onToggleFavorite={handleToggleFavorite}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">등록된 차량이 없습니다</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }

    // 현재 표시할 차량 목록과 페이지 수 결정
    let displayCars = cars;
    let displayTotalPages = totalPages;

    // 즐겨찾기 탭인 경우
    if (activeTab === 'favorite') {
        const favoritePageData = getFavoritePageData();
        displayCars = favoritePageData.items;
        displayTotalPages = favoritePageData.totalPages;

        if (!userId) {
            setError("즐겨찾기 목록을 보려면 로그인이 필요합니다.");
            displayCars = [];
        }
    }

    // 일반 CarListPage UI
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                        {activeTab === 'favorite' ? '즐겨찾기한 차량' : '중고차 찾기'}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {activeTab === 'favorite' ?
                            '관심 있는 차량들을 모아봤습니다.' :
                            '원하는 조건의 차량을 검색하고 비교해보세요.'}
                    </p>
                </div>
            </div>

            <CarFilters
                filters={filters}
                setFilters={setFilters}
                onSearch={handleSearch}
                onReset={handleResetFilters}
            />

            {/* 탭 네비게이션 */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => handleTabChange('all')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            activeTab === 'all'
                                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        전체 차량
                    </button>
                    <button
                        onClick={() => handleTabChange('favorite')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            activeTab === 'favorite'
                                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        즐겨찾기
                    </button>
                </nav>
            </div>

            {/* 오류 메시지 */}
            {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400 dark:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 로딩 상태 */}
            {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center">
                    <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm text-gray-500 dark:text-gray-400">차량 정보를 불러오는 중...</p>
                </div>
            ) : (
                <>
                    {/* 차량 목록 */}
                    {displayCars.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayCars.map(car => (
                                <CarCard
                                    key={car.id}
                                    car={car}
                                    isFavorite={favorites.has(car.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {activeTab === 'favorite' ? '즐겨찾기한 차량이 없습니다.' : '검색 조건에 맞는 차량이 없습니다.'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {activeTab === 'favorite' ?
                                    '관심 있는 차량을 즐겨찾기에 추가해보세요.' :
                                    '다른 검색 조건을 선택해보세요.'}
                            </p>
                        </div>
                    )}

                    {/* 페이지네이션 - 페이지 번호를 1부터 시작하도록 수정 */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={displayTotalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </main>
    );
};

export default CarListPage;