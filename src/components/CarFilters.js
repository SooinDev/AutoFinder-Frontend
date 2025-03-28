import React from "react";
import "../styles/CarList.css"; // 같은 스타일 적용

const CarFilters = ({ filters, setFilters, fetchCars }) => {
    const years = Array.from({ length: 25 }, (_, i) => (new Date().getFullYear() - i).toString());

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="filters-container">
            {[
                { name: "model", placeholder: "모델명" },
                { name: "minPrice", placeholder: "최소 가격", type: "number" },
                { name: "maxPrice", placeholder: "최대 가격", type: "number" },
                { name: "minMileage", placeholder: "최소 주행거리", type: "number" },
                { name: "maxMileage", placeholder: "최대 주행거리", type: "number" },
                { name: "region", placeholder: "지역" }
            ].map((field, idx) => (
                <input
                    key={idx}
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={filters[field.name]}
                    onChange={handleChange}
                    className="filter-input"
                />
            ))}

            <select name="year" value={filters.year} onChange={handleChange} className="filter-input">
                <option value="">연식 선택</option>
                {years.map(year => <option key={year} value={year}>{year}년식</option>)}
            </select>

            <select name="fuel" value={filters.fuel} onChange={handleChange} className="filter-input">
                <option value="">연료 타입</option>
                {["가솔린", "디젤", "LPG", "하이브리드", "전기"].map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                ))}
            </select>

            <button onClick={fetchCars} className="search-btn">검색</button>
        </div>
    );
};

export default CarFilters;