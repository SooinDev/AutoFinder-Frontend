import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchSimilarCars } from '../../api/services';

const SimilarCarsCarousel = ({ carId }) => {
    const [similarCars, setSimilarCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    // 한 번에 보여줄 카드 개수 (반응형)
    const getVisibleCards = () => {
        if (window.innerWidth >= 1024) return 4; // lg
        if (window.innerWidth >= 640) return 2;  // sm
        return 1; // xs
    };

    const [visibleCards, setVisibleCards] = useState(getVisibleCards());

    // 창 크기 변경 감지
    useEffect(() => {
        const handleResize = () => {
            setVisibleCards(getVisibleCards());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadSimilarCars = async () => {
            if (!carId) return;

            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchSimilarCars(carId, 8); // 최대 8개까지 로드
                setSimilarCars(data.content || []);
            } catch (err) {
                console.error("유사 차량 로드 실패:", err);
                setError("유사 차량 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadSimilarCars();
    }, [carId]);

    // 이전 슬라이드로 이동
    const goToPrevious = () => {
        const newIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(newIndex);
    };

    // 다음 슬라이드로 이동
    const goToNext = () => {
        const newIndex = Math.min(currentIndex + 1, similarCars.length - visibleCards);
        setCurrentIndex(newIndex);
    };

    // 이전/다음 버튼 표시 여부
    const showLeftButton = currentIndex > 0;
    const showRightButton = currentIndex < similarCars.length - visibleCards;

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors duration-300 mt-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">비슷한 차량</h3>
                <div className="animate-pulse space-y-4">
                    <div className="flex space-x-4 overflow-hidden">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex-none w-64 h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || similarCars.length === 0) {
        return null; // 오류나 결과 없을 경우 표시하지 않음
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors duration-300 mt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">비슷한 차량</h3>

                <div className="flex space-x-2">
                    <button
                        onClick={goToPrevious}
                        disabled={!showLeftButton}
                        className={`p-2 rounded-full ${
                            showLeftButton
                                ? 'bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-700'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        disabled={!showRightButton}
                        className={`p-2 rounded-full ${
                            showRightButton
                                ? 'bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-700'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
                >
                    {similarCars.map(car => (
                        <div
                            key={car.id}
                            className={`flex-none w-full sm:w-1/2 lg:w-1/4 px-2`}
                        >
                            <Link
                                to={`/cars/${car.id}`}
                                className="block bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow h-full"
                            >
                                <div className="h-32 bg-gray-200 dark:bg-gray-600">
                                    {car.imageUrl ? (
                                        <img
                                            src={car.imageUrl}
                                            alt={car.model}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                            이미지 없음
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 truncate">{car.model}</h4>
                                    <p className="text-teal-600 dark:text-teal-400 font-bold text-sm">{car.price?.toLocaleString() ?? "정보 없음"} 만원</p>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{car.year}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{car.fuel}</span>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{car.region}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* 페이지 인디케이터 (모바일에서만 표시) */}
            <div className="sm:hidden flex justify-center mt-4">
                {Array.from({ length: Math.ceil(similarCars.length / visibleCards) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 w-6 mx-1 rounded-full ${
                            index === currentIndex
                                ? 'bg-teal-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default SimilarCarsCarousel;