import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarList.css';

const CarCard = ({ car, isFavorite, onToggleFavorite }) => {
    return (
        <div className="car-card">
            {car.imageUrl ? (
                <img src={car.imageUrl} alt={car.model} className="car-image" />
            ) : (
                <div className="no-image">이미지 없음</div>
            )}

            <div className="car-info">
                <h3 className="car-title">{car.model}</h3>
                <div className="car-details">
                    <p>연식: {car.year} | {car.fuel}</p>
                    <p>주행거리: {car.mileage !== "정보 없음" ? `${parseInt(car.mileage).toLocaleString()} km` : "정보 없음"}</p>
                </div>
                <p className="car-price">{car.price?.toLocaleString() ?? "정보 없음"} 만원</p>
                <p className="car-location">{car.region}</p>
            </div>

            <button
                onClick={() => onToggleFavorite(car.id)}
                className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
            >
                {isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            </button>

            <Link to={`/cars/${car.id}`} className="details-btn">상세보기</Link>
        </div>
    );
};

export default CarCard;