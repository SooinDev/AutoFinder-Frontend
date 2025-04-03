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
                setPriceData(response.data);
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
            <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
            </div>
        );
    }

    if (priceData.length === 0) {
        return (
            <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="text-gray-500">"{modelName}"에 대한 가격 데이터가 충분하지 않습니다.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{modelName} 연식별 가격 분석</h3>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={priceData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="year"
                            label={{
                                value: '연식',
                                position: 'insideBottomRight',
                                offset: -10
                            }}
                        />
                        <YAxis
                            tickFormatter={value => `${value}만`}
                            label={{
                                value: '가격 (만원)',
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle' }
                            }}
                        />
                        <Tooltip
                            formatter={formatPrice}
                            labelFormatter={value => `${value} 연식`}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="minPrice"
                            name="최저가"
                            fill="#e5f7f7"
                            stroke="#68c2c0"
                            fillOpacity={0.3}
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
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연식</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최저가</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">평균가</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최고가</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">데이터 수</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {priceData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.year}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.minPrice.toLocaleString()}만원</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.avgPrice.toLocaleString()}만원</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.maxPrice.toLocaleString()}만원</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.count}대</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PriceAnalysisChart;