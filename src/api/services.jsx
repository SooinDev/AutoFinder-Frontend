import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

// 인증 헤더 설정
const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return {
        headers: {
            "Authorization": token ? `Bearer ${token}` : undefined
        }
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
        console.log(`차량 상세 정보 API 호출, ID: ${id}`);
        const response = await axios.get(`${API_BASE_URL}/cars/${id}`, getAuthHeaders());
        console.log("서버 응답 (차량 상세):", response.data);

        // 이미지 갤러리 확인 및 처리
        if (response.data && !response.data.imageGallery && response.data.imageUrl) {
            response.data.imageGallery = [response.data.imageUrl];
        }

        return response.data;
    } catch (error) {
        console.error(`차량 ID(${id}) 조회 오류:`, error);
        throw error;
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
        if (isCurrentlyFavorite) {
            // 즐겨찾기 제거
            const response = await axios.delete(
                `${API_BASE_URL}/favorites/${carId}?userId=${userId}`,
                getAuthHeaders()
            );
            return response.data;
        } else {
            // 즐겨찾기 추가
            const response = await axios.post(
                `${API_BASE_URL}/favorites/${carId}?userId=${userId}`,
                null,
                getAuthHeaders()
            );
            return response.data;
        }
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
        // 날짜 형식 조정
        if (carData.registrationDate) {
            // ISO 형식으로 변환
            carData.registrationDate = new Date(carData.registrationDate).toISOString().split('T')[0];
        }

        console.log("차량 추가 시작:", carData);

        // 이미지 처리
        if (carData.imageGallery && carData.imageGallery.length > 0) {
            carData.imageUrl = carData.imageGallery[0];  // 첫 번째 이미지를 메인으로 설정

            // carData에서 mainImageIndex가 있으면 해당 이미지를 메인으로 설정
            if (carData.mainImageIndex !== undefined &&
                carData.mainImageIndex < carData.imageGallery.length) {
                carData.imageUrl = carData.imageGallery[carData.mainImageIndex];
            }
        }

        // DTO 형식에 맞게 변환
        const carCreateDTO = {
            carType: carData.carType || "국산차",
            model: carData.model,
            year: carData.year,
            mileage: carData.mileage ? Number(carData.mileage) : null,
            price: carData.price ? Number(carData.price) : null,
            fuel: carData.fuel,
            region: carData.region,
            description: carData.description,
            carNumber: carData.carNumber,
            registrationDate: carData.registrationDate,
            carClass: carData.carClass,
            color: carData.color,
            transmission: carData.transmission,
            imageUrls: carData.imageGallery || [],
            mainImageIndex: carData.mainImageIndex || 0
        };

        const response = await axios.post(`${API_BASE_URL}/cars`, carCreateDTO, getAuthHeaders());
        console.log("서버 응답 (차량 추가):", response.data);
        return response.data;
    } catch (error) {
        console.error("차량 추가 오류:", error);
        throw error;
    }
};

// 차량 정보 업데이트
export const updateCar = async (id, carData) => {
    try {
        console.log(`차량 업데이트 시작, ID: ${id}`, carData);

        // 날짜 형식 조정
        if (carData.registrationDate) {
            // ISO 형식으로 변환
            carData.registrationDate = new Date(carData.registrationDate).toISOString().split('T')[0];
        }

        // 이미지 처리
        if (carData.imageGallery && carData.imageGallery.length > 0) {
            carData.imageUrl = carData.imageGallery[0];  // 첫 번째 이미지를 메인으로 설정

            // carData에서 mainImageIndex가 있으면 해당 이미지를 메인으로 설정
            if (carData.mainImageIndex !== undefined &&
                carData.mainImageIndex < carData.imageGallery.length) {
                carData.imageUrl = carData.imageGallery[carData.mainImageIndex];
            }
        }

        // DTO 형식에 맞게 변환
        const carUpdateDTO = {
            carType: carData.carType || "국산차",
            model: carData.model,
            year: carData.year,
            mileage: carData.mileage ? Number(carData.mileage) : null,
            price: carData.price ? Number(carData.price) : null,
            fuel: carData.fuel,
            region: carData.region,
            description: carData.description,
            carNumber: carData.carNumber,
            registrationDate: carData.registrationDate,
            carClass: carData.carClass,
            color: carData.color,
            transmission: carData.transmission,
            imageUrls: carData.imageGallery || [],
            mainImageIndex: carData.mainImageIndex || 0
        };

        const response = await axios.put(`${API_BASE_URL}/cars/${id}`, carUpdateDTO, getAuthHeaders());
        console.log("서버 응답 (차량 업데이트):", response.data);
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

// 이미지 업로드 처리 (Mock 버전)
// 이미지 파일 업로드 함수
export const uploadImages = async (files) => {
    if (!files || files.length === 0) return { mainImageUrl: null, galleryUrls: [] };

    try {
        const formData = new FormData();

        // 파일 추가 방식 수정 - 서버에서 예상하는 형식으로 맞춤
        files.forEach((file, index) => {
            formData.append('files', file); // 'images' 대신 'files'로 변경 (서버 API에 맞게 수정)
        });

        console.log('Uploading files:', files); // 디버깅용

        const response = await axios.post(`${API_BASE_URL}/upload/images`, formData, {
            ...getAuthHeaders(),
            headers: {
                ...getAuthHeaders().headers,
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('Upload response:', response.data); // 디버깅용

        // 반환된 형식이 다를 경우 서버 응답에 맞게 수정
        if (response.data && response.data.urls) {
            return {
                mainImageUrl: response.data.urls[0],
                galleryUrls: response.data.urls
            };
        } else if (response.data && response.data.imageUrls) {
            // 다른 응답 형식 처리
            return {
                mainImageUrl: response.data.imageUrls[0],
                galleryUrls: response.data.imageUrls
            };
        } else {
            // 응답에 이미지 URL이 없는 경우
            console.error("Server response does not contain image URLs:", response.data);
            return { mainImageUrl: null, galleryUrls: [] };
        }
    } catch (error) {
        console.error("이미지 업로드 오류:", error.response ? error.response.data : error.message);
        throw error;
    }
};