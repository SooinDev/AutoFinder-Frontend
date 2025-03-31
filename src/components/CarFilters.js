import React from "react";
import "../styles/CarList.css";

const CarFilters = ({ filters, setFilters, onSearch, onReset }) => {
    const years = Array.from({ length: 25 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: year.toString(), label: `${year}년식` };
    });

    const fuelTypes = [
        { value: '가솔린', label: '가솔린' },
        { value: '디젤', label: '디젤' },
        { value: 'LPG', label: 'LPG' },
        { value: '하이브리드', label: '하이브리드' },
        { value: '전기', label: '전기' }
    ];

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="filters-container">
            <div className="filter-inputs">
                <input
                    type="text"
                    name="model"
                    placeholder="모델명"
                    value={filters.model || ''}
                    onChange={handleChange}
                    className="filter-input"
                />

                <input
                    type="number"
                    name="minPrice"
                    placeholder="최소 가격"
                    value={filters.minPrice || ''}
                    onChange={handleChange}
                    className="filter-input"
                />

                <input
                    type="number"
                    name="maxPrice"
                    placeholder="최대 가격"
                    value={filters.maxPrice || ''}
                    onChange={handleChange}
                    className="filter-input"
                />

                <input
                    type="number"
                    name="minMileage"
                    placeholder="최소 주행거리"
                    value={filters.minMileage || ''}
                    onChange={handleChange}
                    className="filter-input"
                />

                <input
                    type="number"
                    name="maxMileage"
                    placeholder="최대 주행거리"
                    value={filters.maxMileage || ''}
                    onChange={handleChange}
                    className="filter-input"
                />

                <input
                    type="text"
                    name="region"
                    placeholder="지역"
                    value={filters.region || ''}
                    onChange={handleChange}
                    className="filter-input"
                />

                <select
                    name="year"
                    value={filters.year || ''}
                    onChange={handleChange}
                    className="filter-input"
                >
                    <option value="">연식 선택</option>
                    {years.map(year => (
                        <option key={year.value} value={year.value}>{year.label}</option>
                    ))}
                </select>

                <select
                    name="fuel"
                    value={filters.fuel || ''}
                    onChange={handleChange}
                    className="filter-input"
                >
                    <option value="">연료 타입</option>
                    {fuelTypes.map(fuel => (
                        <option key={fuel.value} value={fuel.value}>{fuel.label}</option>
                    ))}
                </select>
            </div>

            <div className="filter-buttons">
                <button onClick={onSearch} className="search-btn">검색</button>
                <button onClick={onReset} className="reset-btn">초기화</button>
            </div>
        </div>
    );
};

export default CarFilters;