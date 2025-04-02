import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                <span className="block">지금 시작하세요</span>
                                <span className="block">무료로 가입하고 시작하기</span>
                            </h2>
                            <p className="mt-4 text-lg leading-6 text-teal-50">
                                회원가입 후 즐겨찾기 기능, 맞춤 알림 등 더 많은 기능을 이용할 수 있습니다.
                                여러분의 완벽한 중고차를 오토파인더에서 찾아보세요.
                            </p>
                            <div className="mt-8 flex space-x-4">
                                <Link
                                    to="/register"
                                    className="inline-flex py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-teal-700 bg-white hover:bg-teal-50"
                                >
                                    무료 회원가입
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-flex py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-800 bg-opacity-60 hover:bg-opacity-70"
                                >
                                    로그인
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-12 lg:translate-y-12 h-full">
                            <svg className="h-full w-full text-teal-300 opacity-20" fill="currentColor" viewBox="0 0 600 600">
                                <path d="M600,0L600,0v600h-200v-600H600z M200,0h200v600h-200V0z M0,0h200L0,200V0z M0,200h200L0,400V200z M0,400h200L0,600V400z"/>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-100 to-white">
                  AUTO
                  <br />
                  FINDER
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;