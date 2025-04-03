import React, { useState, useEffect } from 'react';
import { fetchFavorites, toggleFavorite } from '../api/services';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import { useHistory } from 'react-router-dom';

const FavoritesPage = ({ userId, favorites, setFavorites }) => {
    const [favoriteCars, setFavoriteCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const pageSize = 21;  // 한 페이지당 표시할 차량 수

    useEffect(() => {
        // 로그인 여부 확인
        if (!userId) {
            history.push('/login');
            return;
        }

        loadFavorites();
    }, [userId, history]);

    // 즐겨찾기 목록 불러오기
    const loadFavorites = async () => {
        if (!userId) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchFavorites(userId);
            setFavoriteCars(data || []);
            setTotalPages(Math.ceil(data.length / pageSize) || 1);
        } catch (err) {
            console.error("즐겨찾기 로드 실패:", err);
            setError("즐겨찾기 목록을 불러오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 즐겨찾기 토글
    const handleToggleFavorite = async (carId) => {
        try {
            await toggleFavorite(carId, userId, true); // 여기서는 항상 삭제 동작 (즐겨찾기 페이지이므로)

            // 즐겨찾기 상태 업데이트
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                newFavorites.delete(carId);
                return newFavorites;
            });

            // 즐겨찾기 차량 목록에서 해당 차량 제거
            setFavoriteCars(prev => prev.filter(car => car.id !== carId));

            // 페이지 수 재계산
            setTotalPages(Math.ceil((favoriteCars.length - 1) / pageSize) || 1);

            // 만약 현재 페이지에 차량이 없고, 이전 페이지가 존재한다면 이전 페이지로 이동
            if (getCurrentPageCars().length <= 1 && currentPage > 0) {
                setCurrentPage(currentPage - 1);
            }
        } catch (err) {
            console.error("즐겨찾기 삭제 실패:", err);
            alert("즐겨찾기 삭제 중 오류가 발생했습니다.");
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 현재 페이지에 보여줄 차량 목록 계산
    const getCurrentPageCars = () => {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        return favoriteCars.slice(startIndex, endIndex);
    };

    // 현재 페이지 차량 목록
    const currentCars = getCurrentPageCars();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                        내 즐겨찾기
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        관심 있는 차량들을 한눈에 확인하세요.
                    </p>
                </div>
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">즐겨찾기 목록을 불러오는 중...</p>
                </div>
            ) : (
                <>
                    {/* 차량 목록 */}
                    {currentCars.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentCars.map(car => (
                                <CarCard
                                    key={car.id}
                                    car={car}
                                    isFavorite={true} // 항상 즐겨찾기 상태
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">즐겨찾기한 차량이 없습니다.</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">관심 있는 차량을 즐겨찾기에 추가해보세요.</p>
                            <button
                                onClick={() => history.push('/cars')}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                            >
                                차량 검색하기
                            </button>
                        </div>
                    )}

                    {/* 페이지네이션 */}
                    {currentCars.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default FavoritesPage;