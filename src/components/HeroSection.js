import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-br from-teal-500 to-teal-700 overflow-hidden">
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M0 4c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V4z" fill="currentColor" />
                </svg>
            </div>

            {/* 디자인 요소 - 원형 */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white opacity-10"></div>
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white opacity-10"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <h1>
                            <span className="block text-sm font-semibold uppercase tracking-wide text-white">AutoFinder</span>
                            <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-white">당신에게 맞는</span>
                <span className="block text-teal-200">완벽한 중고차</span>
              </span>
                        </h1>
                        <p className="mt-3 text-base text-teal-50 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            복잡한 중고차 시장에서 최적의 선택을 도와드립니다. 다양한 조건과 상세한 정보로
                            중고차 구매의 불안함을 줄이고, 만족스러운 선택을 할 수 있도록 안내합니다.
                        </p>
                        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-800 bg-white hover:bg-teal-50 md:py-4 md:text-lg">
                                    시작하기
                                </Link>
                                <Link to="/" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg">
                                    차량 둘러보기
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                            <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                                <img
                                    className="w-full"
                                    src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                    alt="중고차 예시 이미지"
                                />
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-700 bg-opacity-70">
                                        <svg className="h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;