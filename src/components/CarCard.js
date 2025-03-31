import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car, isFavorite, onToggleFavorite }) => {
    return (
        <div className="car-card">
            {car.imageUrl ? (
                <img src={car.imageUrl} alt={car.model} className="car-image" />
            ) : (
                <div className="no-image">
                    이미지 없음
                </div>
            )}

            <div className="car-info">
                <h3 className="car-title">{car.model}</h3>
                <div className="car-details">
                    <span className="car-tag">{car.year}년식</span>
                    <span className="car-tag">{car.fuel}</span>
                </div>
                <div className="car-info-row">
                    <span className="car-info-label">주행거리:</span>
                    <span>{car.mileage !== "정보 없음" ? `${parseInt(car.mileage).toLocaleString()} km` : "정보 없음"}</span>
                </div>
                <div className="car-info-row">
                    <span className="car-info-label">지역:</span>
                    <span>{car.region}</span>
                </div>
                <p className="car-price">{car.price?.toLocaleString() ?? "정보 없음"} 만원</p>
            </div>

            <div className="car-buttons">
                <button
                    onClick={() => onToggleFavorite(car.id)}
                    className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
                    style={{ width: '100%', maxHeight: '36px' }}
                >
                    {isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                </button>
                <Link
                    to={`/cars/${car.id}`}
                    className="details-btn"
                    style={{ maxHeight: '36px' }}
                >
                    상세보기
                </Link>
            </div>
        </div>
    );
};

export default CarCard;