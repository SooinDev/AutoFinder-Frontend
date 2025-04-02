import React from 'react';

const testimonials = [
    {
        name: '김민수',
        role: '직장인',
        image: '/api/placeholder/100/100',
        quote: '오토파인더 덕분에 제 예산에 맞는 완벽한 차를 찾았습니다. 상세한 필터링 기능이 정말 유용했어요.',
    },
    {
        name: '이지연',
        role: '자영업자',
        image: '/api/placeholder/100/100',
        quote: '다른 사이트에서는 찾지 못했던 차량을 여기서 발견했습니다. 직관적인 인터페이스가 정말 마음에 들어요.',
    },
    {
        name: '박준호',
        role: '대학생',
        image: '/api/placeholder/100/100',
        quote: '첫 차를 구매하는 과정에서 많은 도움을 받았습니다. 꼼꼼한 차량 정보가 결정에 큰 도움이 되었어요.',
    },
];

const TestimonialSection = () => {
    return (
        <section className="bg-gradient-to-r from-teal-50 to-cyan-50 py-16 md:py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            고객 후기
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            오토파인더를 이용한 고객들의 실제 경험을 들어보세요.
                        </p>
                    </div>

                    <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.name} className="flex flex-col h-full rounded-lg shadow-lg overflow-hidden bg-white backdrop-blur-sm bg-opacity-70 border border-teal-100">
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 relative">
                                            <svg className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 h-8 w-8 text-teal-200" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                            </svg>
                                            <p className="relative text-gray-500 mt-3 italic">
                                                {testimonial.quote}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;