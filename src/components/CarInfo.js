import React from "react";

const CarInfo = ({ car }) => {
    return (
        <div className="bg-white shadow overflow-hidden rounded-lg">
            {car.imageUrl ? (
                <div className="w-full h-80 md:h-96 bg-gray-200">
                    <img
                        src={car.imageUrl}
                        alt={car.model}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-full h-80 md:h-96 bg-gray-100 flex items-center justify-center text-gray-400">
                    이미지 없음
                </div>
            )}

            <div className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{car.model}</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {car.year}년식
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {car.fuel}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm border-t border-gray-200 pt-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">주행거리</span>
                        <span className="text-gray-900">{car.mileage?.toLocaleString() ?? "정보 없음"} km</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">지역</span>
                        <span className="text-gray-900">{car.region}</span>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-500 text-sm font-medium">가격</span>
                        <span className="text-2xl font-bold text-teal-600">{car.price?.toLocaleString() ?? "정보 없음"} 만원</span>
                    </div>

                    <a
                        href={car.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-teal-600 text-white py-3 px-4 rounded-md text-sm font-medium text-center hover:bg-teal-700 transition"
                    >
                        상세 정보 보기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CarInfo;