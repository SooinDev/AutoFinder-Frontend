import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car, isFavorite, onToggleFavorite }) => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            {car.imageUrl ? (
                <div className="w-full h-48 bg-gray-200">
                    <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover" />
                </div>
            ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    이미지 없음
                </div>
            )}

            <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{car.model}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {car.year}년식
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {car.fuel}
                    </span>
                </div>

                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">주행거리:</span>
                    <span className="text-sm text-gray-700">{car.mileage !== "정보 없음" ? `${parseInt(car.mileage).toLocaleString()} km` : "정보 없음"}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">지역:</span>
                    <span className="text-sm text-gray-700">{car.region}</span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-teal-600">{car.price?.toLocaleString() ?? "정보 없음"} 만원</span>
                        <button
                            onClick={() => onToggleFavorite(car.id)}
                            className="text-gray-400 hover:text-red-500"
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