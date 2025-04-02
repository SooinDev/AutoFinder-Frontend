import React from 'react';

const stats = [
    { label: '등록 차량', value: '5,000+' },
    { label: '누적 사용자', value: '25,000+' },
    { label: '평균 거래 기간', value: '14일' },
    { label: '고객 만족도', value: '96%' },
];

const StatsSection = () => {
    return (
        <div className="bg-gray-900">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        신뢰할 수 있는 중고차 플랫폼
                    </h2>
                    <p className="mt-3 text-xl text-gray-300 sm:mt-4">
                        오토파인더는 구매자와 판매자 모두에게 투명하고 효율적인 거래 경험을 제공합니다.
                    </p>
                </div>
                <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-2 sm:gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col p-6 bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-300">
                                {stat.label}
                            </dt>
                            <dd className="order-1 text-5xl font-extrabold text-teal-400 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default StatsSection;