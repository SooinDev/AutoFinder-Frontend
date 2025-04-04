import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

// 인증 헤더 설정
const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return {
        headers: {
            "Authorization": token ? `Bearer ${token}` : undefined
        },
        withCredentials: true
    };
};

// 차량 목록 가져오기 (필터링 포함)
export const fetchCars = async (filters = {}, page = 0, size = 21) => {
    try {
        const params = new URLSearchParams();

        // 필터 파라미터 추가
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });

        params.append("page", page);
        params.append("size", size);

        const response = await axios.get(`${API_BASE_URL}/cars?${params.toString()}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("차량 목록 조회 오류:", error);
        return { content: [], totalPages: 0 };
    }
};

// 차량 상세 정보 조회
export const fetchCarById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cars/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`차량 ID(${id}) 조회 오류:`, error);
        return null;
    }
};

// 즐겨찾기 목록 조회
export const fetchFavorites = async (userId) => {
    if (!userId) return [];

    try {
        const response = await axios.get(`${API_BASE_URL}/favorites?userId=${userId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("즐겨찾기 목록 조회 오류:", error);
        return [];
    }
};

// 즐겨찾기 추가/제거
export const toggleFavorite = async (carId, userId, isCurrentlyFavorite) => {
    if (!userId) {
        throw new Error("로그인이 필요합니다");
    }

    try {
        const method = isCurrentlyFavorite ? "DELETE" : "POST";
        const response = await axios({
            method,
            url: `${API_BASE_URL}/favorites/${carId}?userId=${userId}`,
            ...getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("즐겨찾기 업데이트 오류:", error);
        throw error;
    }
};

// 로그인
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("로그인 오류:", error);
        throw error;
    }
};

// 회원가입
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("회원가입 오류:", error);
        throw error;
    }
};

// 유사 차량 목록 조회
export const fetchSimilarCars = async (carId, limit = 8) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cars/${carId}/similar?limit=${limit}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`유사 차량 조회 오류 (ID: ${carId}):`, error);
        return { content: [] };
    }
};