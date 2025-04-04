import React, { useState } from "react";
import { formatPrice, formatNumber } from "../../utils/formatters";

const CarInfo = ({ car }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    // 차량 설명 (실제로는 car 객체에서 가져오지만, 예시로 하드코딩)
    const carDescription = car.description ||
        "이 차량은 정기적으로 정비를 받아왔으며 상태가 매우 양호합니다. 내부 시트는 고급 가죽으로 마감되어 있고, 최신 내비게이션 시스템과 후방 카메라가 설치되어 있습니다. 연비는 도심에서 리터당 약 10km, 고속도로에서 약 14km 정도로 경제적입니다. 주행 성능이 뛰어나며 소음과 진동이 적습니다. 타이어는 최근에 교체하였고, 에어컨과 히터 모두 문제없이 작동합니다.";

    const truncatedDescription = carDescription.length > 150
        ? carDescription.substring(0, 150) + "..."
        : carDescription;

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

    // 가격 표시 도우미 함수
    const displayPrice = (price) => {
        if (!price) return "정보 없음";
        return `${price.toLocaleString()} 만원`;
    };

    // 차량 상세 사양 (실제로는 car 객체에서 가져오지만, 예시로 하드코딩)
    const specifications = {
        performance: [
            { name: "엔진 형식", value: "I4 2.0L 터보" },
            { name: "최대 출력", value: "252hp / 6,500rpm" },
            { name: "최대 토크", value: "35.7kg·m / 1,500rpm" },
            { name: "연비", value: "복합 12.5km/L" }
        ],
        exterior: [
            { name: "색상", value: "화이트 펄" },
            { name: "휠 & 타이어", value: "19인치 알로이 휠" },
            { name: "전조등", value: "LED 헤드램프" }
        ],
        interior: [
            { name: "시트 재질", value: "가죽 시트" },
            { name: "편의 장치", value: "열선 시트, 전동 시트" },
            { name: "인포테인먼트", value: "10.25인치 터치스크린" }
        ],
        safety: [
            { name: "주요 안전 사양", value: "에어백 6개" },
            { name: "운전자 보조", value: "차선 이탈 방지, 전방 충돌 경고" }
        ]
    };

    // 가상의 차량 특징 및 이점 (실제로는 car 객체에서 가져옴)
    const features = [
        "정기적인 유지 보수",
        "무사고 차량",
        "제조사 보증 남음",
        "완전 수리 기록",
        "비흡연자 차량",
        "단일 소유자"
    ];

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
                                        <span className="font-medium text-gray-800 dark:text-white">12가 3456</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">등록일</span>
                                        <span className="font-medium text-gray-800 dark:text-white">2020년 5월</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">소유자 수</span>
                                        <span className="font-medium text-gray-800 dark:text-white">1명</span>
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
                                        <span className="font-medium text-gray-800 dark:text-white">세단</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">연식</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{yearNumber}년식</span>
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
                                        <span className="font-medium text-gray-800 dark:text-white">화이트 펄</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">변속기</span>
                                        <span className="font-medium text-gray-800 dark:text-white">자동 8단</span>
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
                                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                                    </svg>
                                    주요 특징
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'specs':
                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                                성능 및 엔진
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {specifications.performance.map((spec, index) => (
                                    <div key={index} className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{spec.name}</span>
                                        <span className="text-base font-medium text-gray-800 dark:text-white">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                                외관
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {specifications.exterior.map((spec, index) => (
                                    <div key={index} className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{spec.name}</span>
                                        <span className="text-base font-medium text-gray-800 dark:text-white">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                                </svg>
                                내장 & 편의
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {specifications.interior.map((spec, index) => (
                                    <div key={index} className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{spec.name}</span>
                                        <span className="text-base font-medium text-gray-800 dark:text-white">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                안전
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {specifications.safety.map((spec, index) => (
                                    <div key={index} className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{spec.name}</span>
                                        <span className="text-base font-medium text-gray-800 dark:text-white">{spec.value}</span>
                                    </div>
                                ))}
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

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h4 className="text-md font-medium text-gray-800 dark:text-white mb-3">
                                판매자 코멘트
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-600 dark:text-gray-300 italic">
                                    "이 차량은 제가 직접 아끼며 사용했던 차량입니다. 정기적인 점검과 관리로 컨디션이 매우 좋습니다. 실내는 항상 깨끗하게 유지했으며, 금연 차량입니다. 궁금한 점이 있으시면 언제든지 연락주세요."
                                </p>
                                <div className="mt-3 flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="inline-block h-8 w-8 rounded-full bg-teal-500 text-white flex items-center justify-center">
                                            판
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">판매자</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">2023년 10월 12일</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 shadow overflow-hidden rounded-lg transition-colors duration-300">
            {/* 차량 갤러리 섹션 */}
            <div className="relative bg-gray-100 dark:bg-gray-800">
                <div className="lg:flex">
                    <div className="lg:w-2/3">
                        {car.imageUrl ? (
                            <div className="h-80 md:h-96 lg:h-[500px] w-full relative overflow-hidden">
                                <img
                                    src={car.imageUrl}
                                    alt={car.model}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
                                    대표 이미지 1/5
                                </div>
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
                            <div className="border-b border-r border-gray-200 dark:border-gray-700 p-1">
                                <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="border-b border-gray-200 dark:border-gray-700 p-1">
                                <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="border-r border-gray-200 dark:border-gray-700 p-1">
                                <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-1">
                                <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <span className="text-white font-medium">+2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 모바일 썸네일 갤러리 (lg 이하에서만 표시) */}
                <div className="lg:hidden flex overflow-x-auto space-x-2 p-2 bg-white dark:bg-gray-800">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`flex-none w-20 h-20 ${i === 0 ? 'border-2 border-teal-500' : 'border border-gray-200 dark:border-gray-700'} rounded-md overflow-hidden`}
                        >
                            {car.imageUrl ? (
                                <img src={car.imageUrl} alt={`썸네일 ${i+1}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 차량 정보 헤더 */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8">
                <div className="md:flex md:items-start md:justify-between mb-4">
                    <div>
                        <div className="flex items-center mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-2">
                                {yearNumber}년식
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mr-2">
                                {car.mileage ? `${formatNumber(car.mileage)} km` : "정보 없음"}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                                {car.fuel || "정보 없음"}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{car.model}</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{car.region || "정보 없음"} · 등록일: 2023.10.01</p>
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
                    <button className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition hover:bg-gray-100 dark:hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">찜하기</span>
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
                            onClick={() => setActiveTab('specs')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                activeTab === 'specs'
                                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            상세 사양
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
                    </nav>
                </div>

                {/* 탭 컨텐츠 */}
                {renderTabContent()}

                {/* CTA 버튼 */}
                <div className="mt-8 space-y-4">
                <a>
                    href={car.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-teal-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-teal-700 transition"
                    >
                    원문 보기
                </a>

                <div className="flex space-x-4">
                    <button className="flex-1 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        판매자에게 문의하기
                    </button>
                    <button className="flex-1 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        시승 신청하기
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">게시일</p>
                            <p className="font-medium text-gray-900 dark:text-white">2023년 10월 01일</p>
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