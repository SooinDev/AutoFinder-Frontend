import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCarById, toggleFavorite } from '../api/services';
import CarInfo from '../components/car/CarInfo';
import PriceAnalysisChart from '../components/analytics/PriceAnalysisChart';

const CarDetailPage = ({ userId, favorites, setFavorites }) => {
    const { id } = useParams();
    const history = useHistory();
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // 차량 상세 정보 로드
        const loadCarDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchCarById(id);
                if (data) {
                    setCar(data);
                    // 즐겨찾기 여부 확인
                    if (favorites && favorites.has && favorites.has(parseInt(id, 10))) {
                        setIsFavorite(true);
                    }
                } else {
                    setError("차량 정보를 찾을 수 없습니다.");
                }
            } catch (err) {
                setError("차량 정보를 불러오는 중 오류가 발생했습니다.");
                console.error("차량 정보 조회 오류:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadCarDetails();
    }, [id, favorites]);

    const handleGoBack = () => {
        history.goBack();
    };

    // 즐겨찾기 토글 함수
    const handleToggleFavorite = async () => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            history.push("/login");
            return;
        }

        try {
            await toggleFavorite(id, userId, isFavorite);

            setIsFavorite(!isFavorite);

            // 전역 즐겨찾기 상태 업데이트
            if (setFavorites) {
                setFavorites(prev => {
                    const newFavorites = new Set(prev);
                    if (isFavorite) {
                        newFavorites.delete(parseInt(id, 10));
                    } else {
                        newFavorites.add(parseInt(id, 10));
                    }
                    return newFavorites;
                });
            }
        } catch (err) {
            console.error("즐겨찾기 업데이트 실패:", err);
            alert("즐겨찾기 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={handleGoBack}
                className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6"
            >
                <svg
                    className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                    />
                </svg>
                목록으로 돌아가기
            </button>

            {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center">
                    <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm text-gray-500">차량 정보를 불러오는 중...</p>
                </div>
            ) : error ? (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                {error}
                            </h3>
                            <div className="mt-4">
                                <button
                                    onClick={handleGoBack}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                >
                                    돌아가기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : !car ? (
                <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">해당 차량을 찾을 수 없습니다.</h3>
                    <p className="mt-1 text-sm text-gray-500">삭제되었거나 잘못된 접근입니다.</p>
                    <div className="mt-6">
                        <button
                            onClick={handleGoBack}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                        >
                            차량 목록으로 이동
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {/* 로그인 사용자에게 즐겨찾기 버튼 표시 */}
                    {userId && (
                        <div className="mb-6 flex justify-end">
                            <button
                                onClick={handleToggleFavorite}
                                className={`inline-flex items-center px-4 py-2 border ${
                                    isFavorite
                                        ? 'bg-red-50 text-red-500 border-red-300 hover:bg-red-100'
                                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                                } rounded-md shadow-sm text-sm font-medium`}
                            >
                                <svg
                                    className={`-ml-1 mr-2 h-5 w-5 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill={isFavorite ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    strokeWidth={isFavorite ? '0' : '1.5'}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                            </button>
                        </div>
                    )}

                    <CarInfo car={car} />

                    {/* 가격 분석 차트 추가 */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">시장 가격 분석</h2>
                        <PriceAnalysisChart modelName={car.model} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDetailPage;