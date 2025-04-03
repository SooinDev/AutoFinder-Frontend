import React, { useState } from 'react';
import PriceAnalysisChart from '../components/PriceAnalysisChart';
import { useParams } from 'react-router-dom';

const ModelAnalysisPage = () => {
    const { model } = useParams();
    const [searchModel, setSearchModel] = useState(model || '');
    const [currentModel, setCurrentModel] = useState(model || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentModel(searchModel);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">중고차 시장 분석</h1>
                <p className="text-gray-500">
                    차량 모델별 시장 가격 추이와 통계 데이터를 확인하세요.
                </p>
            </div>

            <div className="mb-8 bg-white p-4 rounded-lg shadow">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <label htmlFor="modelSearch" className="block text-sm font-medium text-gray-700 mb-1">
                            차량 모델 검색
                        </label>
                        <input
                            type="text"
                            id="modelSearch"
                            className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="예: 아반떼, 쏘나타, 그랜저 등"
                            value={searchModel}
                            onChange={(e) => setSearchModel(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
                        >
                            분석하기
                        </button>
                    </div>
                </form>
            </div>

            {currentModel && <PriceAnalysisChart modelName={currentModel} />}

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-2">분석 정보</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>그래프는 입력한 모델과 일치하는 모든 차량의 연식별 가격 통계를 보여줍니다.</li>
                    <li>최저가와 최고가 사이의 영역은 해당 연식의 차량 가격 범위를 나타냅니다.</li>
                    <li>평균가는 해당 연식 차량들의 평균 가격입니다.</li>
                    <li>더 정확한 분석을 위해 모델명을 구체적으로 입력하세요. (예: "아반떼" 대신 "아반떼 AD")</li>
                </ul>
            </div>
        </div>
    );
};

export default ModelAnalysisPage;