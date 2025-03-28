import axios from 'axios';

// 백엔드 API 기본 URL (Spring Boot 서버 주소)
const API_BASE_URL = "http://localhost:8080/api";

// 차량 목록 가져오기
export const fetchCars = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cars`);
        return response.data;
    } catch (error) {
        console.error("차량 목록을 가져오는 중 오류 발생:", error);
        return [];
    }
};

// 특정 차량 조회 (ID 기반)
export const fetchCarById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error(`차량 ID(${id}) 조회 중 오류 발생:`, error);
        return null;
    }
};