import React, { useState } from "react";
import { formatPrice, formatNumber, formatDate } from "../../utils/formatters";

const CarInfo = ({ car, onToggleFavorite, isFavorite, userId }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // 차량 설명 처리
    const carDescription = car.description || "차량 설명이 없습니다.";
    const truncatedDescription = carDescription.length > 150
        ? carDescription.substring(0, 150) + "..."
        : carDescription;

    // 차량 연식에서 년식 제거 (숫자만 표시)
    const yearNumber = car.year ? car.year.replace(/년식|식$/g, "").trim() : "";

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

    // 가격 표시 도우미 함수
    const displayPrice = (price) => {
        if (!price) return "정보 없음";
        return `${price.toLocaleString()} 만원`;
    };

    // 이미지 갤러리 처리
    // car.imageGallery가 있으면 사용하고, 없으면 imageUrl을 포함한 배열 생성
    const imageGallery = car.imageGallery && car.imageGallery.length > 0
        ? car.imageGallery
        : (car.imageUrl ? [car.imageUrl] : []);

    // 탭 렌더링 도우미 함수
    const renderTabContent = () => {
        switch(activeTab) {
            case 'details':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                                <h3 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    소유 정보
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">차량 번호</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.carNumber || "정보 없음"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">등록일</span>
                                        <span className="font-medium text-gray-800 dark:text-white">
                                            {car.registrationDate ? formatDate(car.registrationDate) : "정보 없음"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">차량 종류</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.carType || "정보 없음"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                                <h3 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                    기본 정보
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">차종</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.carClass || "정보 없음"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">연식</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.year || "정보 없음"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">주행거리</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.mileage ? `${formatNumber(car.mileage)} km` : "정보 없음"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">연료</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.fuel || "정보 없음"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">색상</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.color || "정보 없음"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">변속기</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.transmission || "정보 없음"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                                <h3 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    가격 정보
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">판매 가격</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{displayPrice(car.price)}</span>
                                    </div>
                                    {monthlyPayment && (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">월 납입금 (예상)</span>
                                                <span className="font-medium text-gray-800 dark:text-white">{displayPrice(monthlyPayment)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">금리</span>
                                                <span className="font-medium text-gray-800 dark:text-white">3.9%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">계약 기간</span>
                                                <span className="font-medium text-gray-800 dark:text-white">36개월</span>
                                            </div>
                                        </>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">할부 상담</span>
                                        <span className="font-medium text-teal-600 dark:text-teal-400 cursor-pointer hover:underline">맞춤 견적 받기</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                                <h3 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    차량 위치
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">지역</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{car.region || "정보 없음"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'description':
                return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">상세 설명</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {carDescription}
                        </p>
                    </div>
                );
            case 'images':
                return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">차량 이미지</h3>
                        {imageGallery.length > 0 ? (
                            <div>
                                <div className="mb-4 aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <img
                                        src={imageGallery[activeImageIndex]}
                                        alt={`${car.model} 이미지 ${activeImageIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {imageGallery.length > 1 && (
                                    <div className="grid grid-cols-5 gap-2">
                                        {imageGallery.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                                                    index === activeImageIndex
                                                        ? 'border-teal-500'
                                                        : 'border-transparent'
                                                }`}
                                                onClick={() => setActiveImageIndex(index)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${car.model} 썸네일 ${index + 1}`}
                                                    className="w-full h-16 object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">등록된 이미지가 없습니다.</p>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    // 찜하기 핸들러
    const handleToggleFavorite = () => {
        if (onToggleFavorite) {
            onToggleFavorite();
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 shadow overflow-hidden rounded-lg transition-colors duration-300">
            {/* 차량 갤러리 섹션 */}
            <div className="relative bg-gray-100 dark:bg-gray-800">
                <div className="lg:flex">
                    <div className="lg:w-2/3">
                        {imageGallery.length > 0 ? (
                            <div className="h-80 md:h-96 lg:h-[500px] w-full relative overflow-hidden">
                                <img
                                    src={imageGallery[activeImageIndex]}
                                    alt={car.model}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                                {imageGallery.length > 1 && (
                                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
                                        {activeImageIndex + 1}/{imageGallery.length}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-80 md:h-96 lg:h-[500px] w-full bg-gray-200 dark:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:block lg:w-1/3 border-l border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 grid-rows-2 h-full">
                            {imageGallery.slice(1, 5).map((image, index) => (
                                <div
                                    key={index}
                                    className={`${
                                        index === 0 ? 'border-b border-r' :
                                            index === 1 ? 'border-b' :
                                                index === 2 ? 'border-r' : ''
                                    } border-gray-200 dark:border-gray-700 p-1 cursor-pointer`}
                                >
                                    <img
                                        src={image}
                                        alt={`${car.model} 이미지 ${index + 2}`}
                                        className="h-full w-full object-cover"
                                        onClick={() => setActiveImageIndex(index + 1)}
                                    />
                                </div>
                            ))}
                            {/* 이미지가 5개 미만인 경우 빈 슬롯 표시 */}
                            {Array.from({ length: Math.max(0, 4 - imageGallery.slice(1).length) }).map((_, index) => (
                                <div
                                    key={`empty-${index}`}
                                    className={`${
                                        index + imageGallery.slice(1).length === 0 ? 'border-b border-r' :
                                            index + imageGallery.slice(1).length === 1 ? 'border-b' :
                                                index + imageGallery.slice(1).length === 2 ? 'border-r' : ''
                                    } border-gray-200 dark:border-gray-700 p-1`}
                                >
                                    <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 모바일 썸네일 갤러리 (lg 이하에서만 표시) */}
                {imageGallery.length > 1 && (
                    <div className="lg:hidden flex overflow-x-auto space-x-2 p-2 bg-white dark:bg-gray-800">
                        {imageGallery.map((image, i) => (
                            <div
                                key={i}
                                className={`flex-none w-20 h-20 ${i === activeImageIndex ? 'border-2 border-teal-500' : 'border border-gray-200 dark:border-gray-700'} rounded-md overflow-hidden cursor-pointer`}
                                onClick={() => setActiveImageIndex(i)}
                            >
                                <img src={image} alt={`썸네일 ${i+1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 차량 정보 헤더 */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8">
                <div className="md:flex md:items-start md:justify-between mb-4">
                    <div>
                        <div className="flex items-center mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-2">
                                {car.year}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mr-2">
                                {car.mileage ? `${formatNumber(car.mileage)} km` : "정보 없음"}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                                {car.fuel || "정보 없음"}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{car.model}</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {car.region || "정보 없음"} · 등록일: {car.registrationDate ? formatDate(car.registrationDate) : "정보 없음"}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                        <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{displayPrice(car.price)}</div>
                        {monthlyPayment && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">월 납입금(예상): {displayPrice(monthlyPayment)}</p>
                        )}
                    </div>
                </div>

                {/* 소개 정보 */}
                <div className="mb-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {showFullDescription ? carDescription : truncatedDescription}
                        {carDescription.length > 150 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="ml-1 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium text-sm"
                            >
                                {showFullDescription ? "접기" : "더 보기"}
                            </button>
                        )}
                    </p>
                </div>

                {/* 빠른 액션 버튼 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    <button className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition hover:bg-gray-100 dark:hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">문의하기</span>
                    </button>
                    <button className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition hover:bg-gray-100 dark:hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">시승예약</span>
                    </button>
                    <button className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition hover:bg-gray-100 dark:hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">차량이력</span>
                    </button>
                    <button
                        onClick={handleToggleFavorite}
                        className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition hover:bg-gray-100 dark:hover:bg-gray-600"
                        disabled={!userId}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-teal-500'} mb-1`}
                            fill={isFavorite ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={isFavorite ? "0" : "2"}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{isFavorite ? '찜 해제' : '찜하기'}</span>
                    </button>
                </div>

                {/* 탭 네비게이션 */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                activeTab === 'details'
                                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            기본 정보
                        </button>
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                activeTab === 'description'
                                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            차량 설명
                        </button>
                        <button
                            onClick={() => setActiveTab('images')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                activeTab === 'images'
                                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            이미지 갤러리
                        </button>
                    </nav>
                </div>

                {/* 탭 컨텐츠 */}
                {renderTabContent()}

                {/* CTA 버튼 */}
                <div className="mt-8 space-y-4">
                    <button className="w-full text-center bg-teal-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-teal-700 transition">
                        판매자에게 문의하기
                    </button>

                    <div className="flex space-x-4">
                        <button className="flex-1 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            시승 신청하기
                        </button>
                        <button
                            onClick={handleToggleFavorite}
                            disabled={!userId}
                            className={`flex-1 text-center border py-3 px-4 rounded-md text-sm font-medium transition ${
                                isFavorite
                                    ? 'border-red-300 text-red-700 dark:border-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900'
                                    : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            {isFavorite ? '찜 해제하기' : '찜하기'}
                        </button>
                    </div>
                </div>

                {/* 관련 정보 */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">차량 위치</p>
                                <p className="font-medium text-gray-900 dark:text-white">{car.region || "정보 없음"}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">등록일</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {car.registrationDate ? formatDate(car.registrationDate) : "정보 없음"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">조회수</p>
                                <p className="font-medium text-gray-900 dark:text-white">1,234회</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarInfo;