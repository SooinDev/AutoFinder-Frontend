import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCarById } from '../api/services';
import CarInfo from '../components/CarInfo';

const CarDetailPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCarDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchCarById(id);
                if (data) {
                    setCar(data);
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
    }, [id]);

    const handleGoBack = () => {
        history.goBack();
    };

    if (isLoading) {
        return (
            <div className="detail-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p className="loading-text">차량 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detail-container">
                <div className="card">
                    <div className="p-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg text-red-600 font-medium mb-4">{error}</p>
                        <button
                            onClick={handleGoBack}
                            className="btn-primary"
                        >
                            목록으로 돌아가기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="detail-container">
                <div className="card">
                    <div className="p-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg text-gray-600 font-medium mb-4">해당 차량을 찾을 수 없습니다.</p>
                        <button
                            onClick={handleGoBack}
                            className="btn-primary"
                        >
                            목록으로 돌아가기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <button
                onClick={handleGoBack}
                className="back-button"
            >
                목록으로 돌아가기
            </button>

            <CarInfo car={car} />
        </div>
    );
};

export default CarDetailPage;