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
        <div className="car-container">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">자동차 목록</h1>
                <p className="text-gray-600">다양한 차량을 검색하고 비교해보세요.</p>
            </div>

            <CarFilters
                filters={filters}
                setFilters={setFilters}
                onSearch={handleSearch}
                onReset={handleResetFilters}
            />

            {error && (
                <div className="error-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="error-icon h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="error-message">{error}</p>
                </div>
            )}

            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p className="loading-text">차량 정보를 불러오는 중...</p>
                </div>
            ) : (
                <>
                    {cars.length > 0 ? (
                        <div className="car-list">
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
                        <div className="empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" className="empty-icon h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg font-medium mt-2">검색 조건에 맞는 차량이 없습니다.</p>
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default CarListPage;