import React from "react";

const CarInfo = ({ car }) => {
    return (
        <div className="car-detail-card">
            {car.imageUrl ? (
                <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="car-detail-image"
                />
            ) : (
                <div className="no-image car-detail-image">
                    이미지 없음
                </div>
            )}

            <div className="car-detail-info">
                <h1 className="car-detail-title">{car.model}</h1>

                <div className="car-detail-tags">
                    <span className="car-detail-tag">{car.year}년식</span>
                    <span className="car-detail-tag">{car.fuel}</span>
                </div>

                <div className="car-detail-info-list">
                    <div className="car-detail-info-item">
                        <span className="car-detail-info-label">주행거리:</span>
                        <span>{car.mileage?.toLocaleString() ?? "정보 없음"} km</span>
                    </div>
                    <div className="car-detail-info-item">
                        <span className="car-detail-info-label">지역:</span>
                        <span>{car.region}</span>
                    </div>
                </div>

                <div className="car-detail-price">
                    {car.price?.toLocaleString() ?? "정보 없음"} 만원
                </div>

                <a
                    href={car.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="car-detail-link"
                >
                    상세 정보 보기
                </a>
            </div>
        </div>
    );
};

export default CarInfo;