import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CarFilters from "../components/CarFilters";
import "../styles/CarList.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CarList = ({ userId: propUserId }) => {
    const [userId, setUserId] = useState(localStorage.getItem("userId") || propUserId);
    const [cars, setCars] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({
        model: "", minPrice: "", maxPrice: "", minMileage: "", maxMileage: "", fuel: "", region: "", year: ""
    });

    useEffect(() => {
        if (!userId) {
            const storedUserId = localStorage.getItem("userId");
            if (storedUserId) {
                setUserId(storedUserId);
            }
        }
    }, []);

    useEffect(() => {
        fetchCars();

        if (userId) {
            fetchFavorites();
        } else {
            setFavorites(new Set()); // 로그아웃 시 즉시 관심 차량 초기화
        }
    }, [currentPage, userId]);

    const fetchCars = () => {
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params.append(key, filters[key]);
            }
        });
        params.append("page", currentPage);
        params.append("size", 21);

        axios.get(`/api/cars?${params.toString()}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            withCredentials: true
        })
            .then(response => {
                setCars(response.data.content || []);
                setTotalPages(response.data.totalPages);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch(error => console.error("차량 검색 오류:", error));
    };

    const fetchFavorites = () => {
        if (!userId) return;

        axios.get(`/favorites?userId=${userId}`)
            .then(response => {
                const favSet = new Set(response.data.map(car => car.id));
                setFavorites(favSet);
            })
            .catch(error => console.error("즐겨찾기 목록 불러오기 오류:", error));
    };

    const toggleFavorite = async (carId) => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        const method = favorites.has(carId) ? "DELETE" : "POST";

        try {
            await axios({
                method,
                url: `/favorites/${carId}?userId=${userId}`,
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                withCredentials: true
            });

            setFavorites(prevFavorites => {
                const newFavorites = new Set(prevFavorites);
                if (newFavorites.has(carId)) {
                    newFavorites.delete(carId);
                } else {
                    newFavorites.add(carId);
                }
                return newFavorites;
            });
        } catch (error) {
            console.error("즐겨찾기 업데이트 오류:", error);
        }
    };

    const handleResetFilters = () => {
        setFilters({
            model: "", minPrice: "", maxPrice: "", minMileage: "", maxMileage: "", fuel: "", region: "", year: ""
        });
        setCurrentPage(0);
    };

    const handleSearch = () => {
        setCurrentPage(0);
        fetchCars();
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="carlist-container">
            <CarFilters filters={filters} setFilters={setFilters} fetchCars={handleSearch} onReset={handleResetFilters} />

            <div className="car-list">
                {cars.length > 0 ? (
                    cars.map(car => (
                        <div key={car.id} className="car-card">
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
                                onClick={() => toggleFavorite(car.id)}
                                className={`favorite-btn ${favorites.has(car.id) ? "favorited" : ""}`}
                            >
                                {favorites.has(car.id) ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                            </button>

                            <Link to={`/cars/${car.id}`} className="details-btn">상세보기</Link>
                        </div>
                    ))
                ) : (
                    <p className="no-cars">불러올 차량이 없습니다.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className={currentPage === 0 ? "disabled" : ""}
                    >
                        <FaArrowLeft />
                    </button>

                    <span>{currentPage + 1} / {totalPages}</span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className={currentPage >= totalPages - 1 ? "disabled" : ""}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CarList;