import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car, isFavorite, onToggleFavorite }) => {
    // 이미지 URL 확인 및 기본값 설정
    const imageUrl = car.imageUrl || (car.imageGallery && car.imageGallery.length > 0 ? car.imageGallery[0] : null);

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={car.model}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error("이미지 로드 실패:", imageUrl);
                            e.target.onerror = null; // 무한 루프 방지
                            e.target.parentNode.classList.add("bg-gray-100", "dark:bg-gray-700", "flex", "items-center", "justify-center");
                            e.target.parentNode.innerHTML = '<span class="text-gray-400 dark:text-gray-500">이미지 없음</span>';
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                        이미지 없음
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{car.model}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {car.year}년식
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {car.fuel}
                    </span>
                </div>

                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">주행거리:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{car.mileage !== null && car.mileage !== undefined && car.mileage !== "정보 없음" ? `${parseInt(car.mileage).toLocaleString()} km` : "정보 없음"}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">지역:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{car.region}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-teal-600 dark:text-teal-400">{car.price?.toLocaleString() ?? "정보 없음"} 만원</span>
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // 링크 클릭 방지
                                onToggleFavorite(car.id);
                            }}
                            className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill={isFavorite ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={isFavorite ? "0" : "2"}
                                color={isFavorite ? "#EF4444" : "currentColor"}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <Link
                        to={`/cars/${car.id}`}
                        className="block w-full bg-teal-600 text-white py-2 px-4 rounded-md text-sm font-medium text-center hover:bg-teal-700"
                    >
                        상세보기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;