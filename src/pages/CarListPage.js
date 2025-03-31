import React, { useState, useEffect } from 'react';
import { fetchCars, fetchFavorites, toggleFavorite } from '../api/services';
import CarFilters from '../components/CarFilters';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import '../styles/CarList.css';

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
        <div className="carlist-container">
            <div className="carlist-header">
                <h1>자동차 목록</h1>
                <p>다양한 차량을 검색하고 비교해보세요.</p>
            </div>

            <CarFilters
                filters={filters}
                setFilters={setFilters}
                onSearch={handleSearch}
                onReset={handleResetFilters}
            />

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="loading-spinner">
                    <p>차량 정보를 불러오는 중...</p>
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
                        <div className="no-cars">
                            <p>검색 조건에 맞는 차량이 없습니다.</p>
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