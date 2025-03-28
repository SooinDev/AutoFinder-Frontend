import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CarInfo from '../components/CarInfo'; // 차량 정보 UI 컴포넌트
import '../styles/CarDetail.css'; // 스타일 파일

// CarDetail
const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        axios.get(`/api/cars/${id}`)
            .then(response => {
                console.log("차량 상세 정보:", response.data);
                setCar(response.data);
            })
            .catch(error => {
                console.error("차량 정보를 가져오는 중 오류 발생:", error);
            });
    }, [id]);

    if (!car) return <p className="loading-text">차량 정보를 불러오는 중...</p>;

    return (
        <div className="car-detail-container">
            <CarInfo car={car} />
        </div>
    );
};

export default CarDetail;