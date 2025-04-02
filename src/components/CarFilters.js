import React from "react";

const CarFilters = ({ filters, setFilters, onSearch, onReset }) => {
    const years = Array.from({ length: 25 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: year.toString(), label: `${year}년식` };
    });

    const fuelTypes = [
        { value: '가솔린', label: '가솔린' },
        { value: '디젤', label: '디젤' },
        { value: 'LPG', label: 'LPG' },
        { value: '하이브리드', label: '하이브리드' },
        { value: '전기', label: '전기' }
    ];

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">차량 검색 필터</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">차량 모델</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            placeholder="모델명을 입력하세요"
                            value={filters.model || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">연식</label>
                        <select
                            id="year"
                            name="year"
                            value={filters.year || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            <option value="">모든 연식</option>
                            {years.map(year => (
                                <option key={year.value} value={year.value}>{year.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 mb-1">연료 타입</label>
                        <select
                            id="fuel"
                            name="fuel"
                            value={filters.fuel || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            <option value="">모든 연료</option>
                            {fuelTypes.map(fuel => (
                                <option key={fuel.value} value={fuel.value}>{fuel.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">가격 범위 (만원)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                id="minPrice"
                                name="minPrice"
                                placeholder="최소 가격"
                                value={filters.minPrice || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            <span className="flex items-center text-gray-500">~</span>
                            <input
                                type="number"
                                id="maxPrice"
                                name="maxPrice"
                                placeholder="최대 가격"
                                value={filters.maxPrice || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">주행거리 범위 (km)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                id="minMileage"
                                name="minMileage"
                                placeholder="최소 주행거리"
                                value={filters.minMileage || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            <span className="flex items-center text-gray-500">~</span>
                            <input
                                type="number"
                                id="maxMileage"
                                name="maxMileage"
                                placeholder="최대 주행거리"
                                value={filters.maxMileage || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">지역</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        placeholder="지역을 입력하세요"
                        value={filters.region || ''}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onReset}
                        className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        초기화
                    </button>
                    <button
                        onClick={onSearch}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                    >
                        검색하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarFilters;