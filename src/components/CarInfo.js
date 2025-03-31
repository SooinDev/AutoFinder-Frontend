import React from "react";
import "../styles/CarDetail.css";

const CarInfo = ({ car }) => {
    return (
        <div className="car-info-card">
            {car.imageUrl ? (
                <img src={car.imageUrl} alt={car.model} className="car-info-image" />
            ) : (
                <div className="no-image">이미지 없음</div>
            )}
            <h1 className="car-title">{car.model}</h1>
            <p className="car-details">연식: {car.year} | 주행거리: {car.mileage?.toLocaleString() ?? "정보 없음"} km</p>
            <p className="car-details">연료 타입: {car.fuel}</p>
            <p className="car-details">지역: {car.region}</p>
            <p className="car-price">{car.price?.toLocaleString() ?? "정보 없음"} 만원</p>
            <a href={car.url} target="_blank" rel="noopener noreferrer" className="details-btn">
                상세 정보 보기
            </a>
        </div>
    );
};

export default CarInfo;