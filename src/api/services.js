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

// 새 차량 추가
export const addCar = async (carData) => {
    try {
        // 이미지 파일 업로드 처리
        if (carData.imageFiles && carData.imageFiles.length > 0) {
            const imageUrls = await uploadImages(carData.imageFiles);

            // 메인 이미지와 갤러리 이미지 설정
            carData.imageUrl = imageUrls.mainImageUrl;
            carData.imageGallery = imageUrls.galleryUrls;

            // 파일 객체 제거 (서버에 전송하지 않음)
            delete carData.imageFiles;
        }

        const response = await axios.post(`${API_BASE_URL}/cars`, carData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("차량 추가 오류:", error);
        throw error;
    }
};

// 차량 정보 업데이트
export const updateCar = async (id, carData) => {
    try {
        // 새로운 이미지 파일 업로드 처리
        if (carData.imageFiles && carData.imageFiles.length > 0) {
            const imageUrls = await uploadImages(carData.imageFiles);

            // 메인 이미지와 갤러리 이미지 설정
            carData.imageUrl = imageUrls.mainImageUrl;

            // 갤러리 이미지 업데이트 (기존 이미지 + 새 이미지)
            if (carData.imageGallery && Array.isArray(carData.imageGallery)) {
                carData.imageGallery = [...carData.imageGallery, ...imageUrls.galleryUrls.slice(1)];
            } else {
                carData.imageGallery = imageUrls.galleryUrls;
            }

            // 파일 객체 제거 (서버에 전송하지 않음)
            delete carData.imageFiles;
        }

        const response = await axios.put(`${API_BASE_URL}/cars/${id}`, carData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`차량 업데이트 오류 (ID: ${id}):`, error);
        throw error;
    }
};


// 차량 삭제
export const deleteCar = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/cars/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`차량 삭제 오류 (ID: ${id}):`, error);
        throw error;
    }
};

// services.js에 추가할 이미지 업로드 관련 함수

// 이미지 파일 업로드 함수
export const uploadImages = async (files) => {
    if (!files || files.length === 0) return { mainImageUrl: null, galleryUrls: [] };

    try {
        // 실제 구현에서는 FormData를 사용하여 서버에 파일 업로드
        const formData = new FormData();

        // 각 파일을 formData에 추가
        files.forEach((file, index) => {
            formData.append('images', file);
        });

        const response = await axios.post(`${API_BASE_URL}/upload/images`, formData, {
            ...getAuthHeaders(),
            headers: {
                ...getAuthHeaders().headers,
                'Content-Type': 'multipart/form-data'
            }
        });

        // 서버로부터 업로드된 이미지 URL 배열 반환
        return {
            mainImageUrl: response.data.urls[0], // 첫 번째 이미지를 메인 이미지로 사용
            galleryUrls: response.data.urls     // 모든 이미지 URL 배열
        };
    } catch (error) {
        console.error("이미지 업로드 오류:", error);
        throw error;
    }
};

// 이미지 삭제 함수
export const deleteImage = async (imageUrl) => {
    try {
        // URL에서 파일명 추출 (실제 구현에서는 서버에 맞게 수정)
        const filename = imageUrl.split('/').pop();

        const response = await axios.delete(`${API_BASE_URL}/upload/images/${filename}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`이미지 삭제 오류 (${imageUrl}):`, error);
        throw error;
    }
};