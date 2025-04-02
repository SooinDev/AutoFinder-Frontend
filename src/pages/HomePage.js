import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import CarListPage from './CarListPage';
import TestimonialSection from '../components/TestimonialSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';

const HomePage = ({ userId, favorites, setFavorites }) => {
    return (
        <>
            <HeroSection />
            <FeatureSection />
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">차량 둘러보기</h2>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            최신 등록 차량
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            오토파인더에 새롭게 등록된 차량들을 확인해보세요.
                        </p>
                    </div>
                    <CarListPage
                        userId={userId}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        isHomePage={true} // 홈페이지에서 필터 및 페이지네이션 간소화를 위한 prop
                    />
                </div>
            </div>
            <TestimonialSection />
            <StatsSection />
            <CTASection />
        </>
    );
};

export default HomePage;