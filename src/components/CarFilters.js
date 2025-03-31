import React from "react";

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
                <div className="filter-group">
                    <label htmlFor="model" className="filter-label">모델명</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="모델명 입력"
                        value={filters.model || ''}
                        onChange={handleChange}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="region" className="filter-label">지역</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        placeholder="지역 입력"
                        value={filters.region || ''}
                        onChange={handleChange}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="year" className="filter-label">연식</label>
                    <select
                        id="year"
                        name="year"
                        value={filters.year || ''}
                        onChange={handleChange}
                        className="filter-input"
                    >
                        <option value="">전체 연식</option>
                        {years.map(year => (
                            <option key={year.value} value={year.value}>{year.label}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="fuel" className="filter-label">연료 타입</label>
                    <select
                        id="fuel"
                        name="fuel"
                        value={filters.fuel || ''}
                        onChange={handleChange}
                        className="filter-input"
                    >
                        <option value="">전체 연료</option>
                        {fuelTypes.map(fuel => (
                            <option key={fuel.value} value={fuel.value}>{fuel.label}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="minPrice" className="filter-label">최소 가격 (만원)</label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        placeholder="최소 가격"
                        value={filters.minPrice || ''}
                        onChange={handleChange}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="maxPrice" className="filter-label">최대 가격 (만원)</label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="최대 가격"
                        value={filters.maxPrice || ''}
                        onChange={handleChange}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="minMileage" className="filter-label">최소 주행거리 (km)</label>
                    <input
                        type="number"
                        id="minMileage"
                        name="minMileage"
                        placeholder="최소 주행거리"
                        value={filters.minMileage || ''}
                        onChange={handleChange}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="maxMileage" className="filter-label">최대 주행거리 (km)</label>
                    <input
                        type="number"
                        id="maxMileage"
                        name="maxMileage"
                        placeholder="최대 주행거리"
                        value={filters.maxMileage || ''}
                        onChange={handleChange}
                        className="filter-input"
                    />
                </div>
            </div>

            <div className="filter-buttons">
                <button onClick={onReset} className="btn-secondary">초기화</button>
                <button onClick={onSearch} className="btn-primary">검색</button>
            </div>
        </div>
    );
};

export default CarFilters;