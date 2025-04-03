import React, { useState } from "react";

const CarInfo = ({ car }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // 상세 설명 내용 (데모용 텍스트)
    const carDescription = "이 차량은 정기적으로 정비를 받아왔으며 상태가 매우 양호합니다. 내부 시트는 고급 가죽으로 마감되어 있고, 최신 내비게이션 시스템과 후방 카메라가 설치되어 있습니다. 연비는 도심에서 리터당 약 10km, 고속도로에서 약 14km 정도로 경제적입니다. 주행 성능이 뛰어나며 소음과 진동이 적습니다. 타이어는 최근에 교체하였고, 에어컨과 히터 모두 문제없이 작동합니다.";

    const truncatedDescription = carDescription.substring(0, 100) + (carDescription.length > 100 ? "..." : "");

    // 차량 연식에서 년식 제거 (숫자만 표시)
    const yearNumber = car.year ? car.year.replace("년식", "") : "";

    // 가격 계산 함수 (월 납입금 추정)
    const calculateMonthlyPayment = (price, downPayment = 0.3, years = 3, interestRate = 0.039) => {
        if (!price) return null;

        const loanAmount = price * 10000 * (1 - downPayment); // 만원 단위를 원 단위로 변환
        const monthlyRate = interestRate / 12;
        const numberOfPayments = years * 12;
        const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        return Math.round(payment / 10000); // 다시 만원 단위로 변환
    };

    const monthlyPayment = calculateMonthlyPayment(car.price);

    return (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg transition-colors duration-300">
            {car.imageUrl ? (
                <div className="w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-700">
                    <img
                        src={car.imageUrl}
                        alt={car.model}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-full h-80 md:h-96 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    이미지 없음
                </div>
            )}

            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{car.model}</h1>
                    <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">{car.price?.toLocaleString() ?? "정보 없음"} 만원</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {yearNumber}년식
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {car.fuel}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {car.region}
                    </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">차량 설명</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {showFullDescription ? carDescription : truncatedDescription}
                        {carDescription.length > 100 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="ml-1 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium text-sm"
                            >
                                {showFullDescription ? "접기" : "더 보기"}
                            </button>
                        )}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">상세 정보</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">주행거리</span>
                                <span className="text-gray-900 dark:text-white font-medium">{car.mileage?.toLocaleString() ?? "정보 없음"} km</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">연료</span>
                                <span className="text-gray-900 dark:text-white font-medium">{car.fuel || "정보 없음"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">색상</span>
                                <span className="text-gray-900 dark:text-white font-medium">흰색</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">변속기</span>
                                <span className="text-gray-900 dark:text-white font-medium">자동</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">금융 정보</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">차량 가격</span>
                                <span className="text-gray-900 dark:text-white font-medium">{car.price?.toLocaleString() ?? "정보 없음"} 만원</span>
                            </div>
                            {monthlyPayment && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">월 납입금 (예상)</span>
                                    <span className="text-gray-900 dark:text-white font-medium">{monthlyPayment.toLocaleString()} 만원</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">지역</span>
                                <span className="text-gray-900 dark:text-white font-medium">{car.region || "정보 없음"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <a
                        href={car.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-teal-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-teal-700 transition"
                    >
                        상세 정보 보기
                    </a>

                    <button className="block w-full text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        판매자에게 문의하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarInfo;