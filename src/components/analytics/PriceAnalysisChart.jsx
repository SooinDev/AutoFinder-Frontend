import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, Area, ComposedChart
} from 'recharts';
import axios from 'axios';

const PriceAnalysisChart = ({ modelName }) => {
    const [priceData, setPriceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!modelName) return;

        const loadPriceStats = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // API_BASE_URL 사용하도록 수정
                const API_BASE_URL = "http://localhost:8080/api";
                const response = await axios.get(
                    `${API_BASE_URL}/analytics/price-by-year/${encodeURIComponent(modelName)}`
                );

                // 받아온 데이터를 연식 숫자 기준으로 정렬 (오래된 차 → 최신 차 순)
                const sortedData = [...response.data].sort((a, b) => {
                    // originalYear에서 년식을 추출 (예: "2023년식" → "2023")
                    const yearA = a.originalYear;
                    const yearB = b.originalYear;

                    // 연도 비교 (숫자로 변환하여 비교)
                    return parseInt(yearA) - parseInt(yearB);
                });

                setPriceData(sortedData);
            } catch (err) {
                console.error("가격 통계 데이터 로드 실패:", err);
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadPriceStats();
    }, [modelName]);

    const formatPrice = (value) => {
        return `${value.toLocaleString()}만원`;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 rounded-md">
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
        );
    }

    if (priceData.length === 0) {
        return (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center">
                <p className="text-gray-500 dark:text-gray-400">"{modelName}"에 대한 가격 데이터가 충분하지 않습니다.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors duration-300">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">{modelName} 연식별 가격 분석</h3>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={priceData}
                        margin={{ top: 40, right: 30, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="year"
                            label={{
                                value: '연식',
                                position: 'insideBottomRight',
                                offset: -10,
                                fill: '#6B7280',
                                style: { fill: 'currentColor' },
                                className: "dark:text-gray-300"
                            }}
                            tick={{ fill: '#6B7280' }}
                            className="dark:text-gray-300"
                        />
                        <YAxis
                            tickFormatter={value => `${value}만`}
                            label={{
                                value: '가격 (만원)',
                                position: 'top',
                                offset: 20,
                                style: { textAnchor: 'middle', fill: 'currentColor' },
                                className: "dark:text-gray-300"
                            }}
                            tick={{ fill: '#6B7280' }}
                            className="dark:text-gray-300"
                        />
                        <Tooltip
                            formatter={formatPrice}
                            labelFormatter={value => value}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.375rem',
                                color: '#4b5563'
                            }}
                            itemStyle={{ color: '#4b5563' }}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="minPrice"
                            name="최저가"
                            fill="#e5f7f7"
                            stroke="#68c2c0"
                            fillOpacity={0.3}
                            className="dark:fill-teal-900 dark:stroke-teal-700"
                        />
                        <Line
                            type="monotone"
                            dataKey="avgPrice"
                            name="평균가"
                            stroke="#0e7490"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="maxPrice"
                            name="최고가"
                            fill="#e5f7f7"
                            stroke="#68c2c0"
                            fillOpacity={0.3}
                            className="dark:fill-teal-900 dark:stroke-teal-700"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">연식</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">최저가</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">평균가</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">최고가</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">데이터 수</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {priceData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.year}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.minPrice.toLocaleString()}만원</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.avgPrice.toLocaleString()}만원</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.maxPrice.toLocaleString()}만원</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.count}대</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PriceAnalysisChart;