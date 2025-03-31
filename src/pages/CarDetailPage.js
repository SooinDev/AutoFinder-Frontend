import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarById } from '../api/services';
import CarInfo from '../components/CarInfo';
import '../styles/CarDetail.css';

const CarDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
        navigate(-1);
    };

    if (isLoading) {
        return <div className="loading-text">차량 정보를 불러오는 중...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-text">{error}</p>
                <button onClick={handleGoBack} className="back-button">목록으로 돌아가기</button>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="error-container">
                <p className="not-found-text">해당 차량을 찾을 수 없습니다.</p>
                <button onClick={handleGoBack} className="back-button">목록으로 돌아가기</button>
            </div>
        );
    }

    return (
        <div className="car-detail-container">
            <div className="back-button-container">
                <button onClick={handleGoBack} className="back-button">
                    &larr; 목록으로 돌아가기
                </button>
            </div>

            <CarInfo car={car} />
        </div>
    );
};

export default CarDetailPage;