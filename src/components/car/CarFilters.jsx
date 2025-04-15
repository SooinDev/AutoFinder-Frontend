import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CarFilters = ({ filters, setFilters, onSearch, onReset }) => {
    const location = useLocation();

    // 컴포넌트가 마운트될 때 URL 쿼리 파라미터를 확인하여 필터 상태 초기화
    useEffect(() => {
        // URL 파라미터 파싱
        const searchParams = new URLSearchParams(location.search);
        const updatedFilters = { ...filters };
        let hasChanged = false;

        // 각 필터 항목에 대해 URL 파라미터 확인
        Object.keys(filters).forEach(key => {
            const value = searchParams.get(key);
            if (value !== null && updatedFilters[key] !== value) {
                updatedFilters[key] = value;
                hasChanged = true;
            }
        });

        // 필터 값이 변경되었다면 상태 업데이트
        if (hasChanged) {
            setFilters(updatedFilters);
        }
    }, [location.search]); // 의존성 배열에 location.search 추가

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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-8 transition-colors duration-300">
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">차량 검색 필터</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">차량 모델</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            placeholder="모델명을 입력하세요"
                            value={filters.model || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">연식</label>
                        <select
                            id="year"
                            name="year"
                            value={filters.year || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">모든 연식</option>
                            {years.map(year => (
                                <option key={year.value} value={year.value}>{year.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">연료 타입</label>
                        <select
                            id="fuel"
                            name="fuel"
                            value={filters.fuel || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">가격 범위 (만원)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                id="minPrice"
                                name="minPrice"
                                placeholder="최소 가격"
                                value={filters.minPrice || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            />
                            <span className="flex items-center text-gray-500 dark:text-gray-400">~</span>
                            <input
                                type="number"
                                id="maxPrice"
                                name="maxPrice"
                                placeholder="최대 가격"
                                value={filters.maxPrice || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">주행거리 범위 (km)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                id="minMileage"
                                name="minMileage"
                                placeholder="최소 주행거리"
                                value={filters.minMileage || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            />
                            <span className="flex items-center text-gray-500 dark:text-gray-400">~</span>
                            <input
                                type="number"
                                id="maxMileage"
                                name="maxMileage"
                                placeholder="최대 주행거리"
                                value={filters.maxMileage || ''}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">지역</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        placeholder="지역을 입력하세요"
                        value={filters.region || ''}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onReset}
                        className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        초기화
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                    >
                        검색하기
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CarFilters;