import React, { useState, useEffect } from 'react';
import { fetchCars, fetchFavorites, toggleFavorite } from '../api/services';
import CarFilters from '../components/CarFilters';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';

const CarListPage = ({ userId }) => {
    const [cars, setCars] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({
        model: "", minPrice: "", maxPrice: "", minMileage: "", maxMileage: "", fuel: "", region: "", year: ""
    });

    // 차량 목록 불러오기
    const loadCars = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchCars(filters, currentPage);
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
            return;
        }

        try {
            const favoritesData = await fetchFavorites(userId);
            setFavorites(new Set(favoritesData.map(car => car.id)));
        } catch (err) {
            console.error("즐겨찾기 로드 실패:", err);
        }
    };

    // 검색 기능
    const handleSearch = () => {
        setCurrentPage(0);
        loadCars();
    };

    // 필터 초기화
    const handleResetFilters = () => {
        setFilters({
            model: "", minPrice: "", maxPrice: "", minMileage: "", maxMileage: "", fuel: "", region: "", year: ""
        });
        setCurrentPage(0);
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

            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(carId)) {
                    newFavorites.delete(carId);
                } else {
                    newFavorites.add(carId);
                }
                return newFavorites;
            });
        } catch (err) {
            console.error("즐겨찾기 업데이트 실패:", err);
            alert("즐겨찾기 처리 중 오류가 발생했습니다.");
        }
    };

    // 페이지나 사용자 ID 변경 시 데이터 로드
    useEffect(() => {
        loadCars();
    }, [currentPage]);

    useEffect(() => {
        if (userId) {
            loadFavorites();
        } else {
            setFavorites(new Set());
        }
    }, [userId]);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        중고차 찾기
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        원하는 조건의 차량을 검색하고 비교해보세요.
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
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'all'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        전체 차량
                    </button>
                    <button
                        onClick={() => {
                            if (userId) {
                                setActiveTab('favorite');
                                // 즐겨찾기 차량만 필터링하는 로직 추가 필요
                            } else {
                                alert('로그인이 필요합니다.');
                            }
                        }}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'favorite'
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        즐겨찾기
                    </button>
                </nav>
            </div>

            {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center">
                    <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm text-gray-500">차량 정보를 불러오는 중...</p>
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
                        <div className="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg font-medium text-gray-700 mb-1">검색 조건에 맞는 차량이 없습니다.</p>
                            <p className="text-sm text-gray-500">다른 검색 조건을 선택해보세요.</p>
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </main>
    );
};

export default CarListPage;