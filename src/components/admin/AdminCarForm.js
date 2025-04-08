import React, { useState, useEffect } from 'react';
import { addCar, updateCar } from '../../api/services';

const AdminCarForm = ({ car, onSuccess }) => {
    const isEditMode = !!car;

    // 기본 폼 상태 설정
    const [formData, setFormData] = useState({
        model: '',
        year: '',
        mileage: '',
        price: '',
        fuel: '',
        region: '',
        carType: '국산차',
        url: '',
        imageUrl: '',
        description: '',
        carNumber: '',
        registrationDate: '',
        carClass: '',
        color: '',
        transmission: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // 편집 모드인 경우 기존 데이터로 폼 초기화
    useEffect(() => {
        if (car) {
            // 날짜 형식 변환 (yyyy-MM-dd)
            let formattedRegistrationDate = '';
            if (car.registrationDate) {
                const date = new Date(car.registrationDate);
                formattedRegistrationDate = date.toISOString().split('T')[0];
            }

            setFormData({
                ...car,
                registrationDate: formattedRegistrationDate,
                mileage: car.mileage || '',
                price: car.price || '',
                description: car.description || '',
                carNumber: car.carNumber || '',
                carClass: car.carClass || '',
                color: car.color || '',
                transmission: car.transmission || ''
            });
        }
    }, [car]);

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 숫자 입력 필드 핸들러 (숫자만 입력되도록)
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        if (value === '' || /^[0-9]+$/.test(value)) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // 데이터 변환 (문자열 → 숫자)
            const preparedData = {
                ...formData,
                mileage: formData.mileage ? parseInt(formData.mileage, 10) : null,
                price: formData.price ? parseInt(formData.price, 10) : null,
            };

            // 편집/추가 모드에 따라 적절한 API 호출
            if (isEditMode) {
                await updateCar(car.id, preparedData);
            } else {
                await addCar(preparedData);
            }

            // 성공 콜백 호출
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('차량 저장 오류:', err);
            setError(isEditMode ? '차량 정보 업데이트 중 오류가 발생했습니다.' : '새 차량 추가 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 연료 타입 옵션
    const fuelTypes = [
        '가솔린', '디젤', 'LPG', '하이브리드', '전기', '기타'
    ];

    // 차종 옵션
    const carClasses = [
        '경차', '소형', '준중형', '중형', '준대형', '대형', 'SUV', '승합차', '트럭', '기타'
    ];

    // 변속기 옵션
    const transmissionTypes = [
        '자동', '수동', 'DCT', 'CVT', '기타'
    ];

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-5">
                {isEditMode ? '차량 정보 편집' : '새 차량 추가'}
            </h2>

            {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900 dark:bg-opacity-20">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 기본 정보 섹션 */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">기본 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    차량 모델 *
                                </label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="carNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    차량 번호
                                </label>
                                <input
                                    type="text"
                                    id="carNumber"
                                    name="carNumber"
                                    value={formData.carNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="예: 12가 3456"
                                />
                            </div>

                            <div>
                                <label htmlFor="carType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    차량 종류 *
                                </label>
                                <select
                                    id="carType"
                                    name="carType"
                                    value={formData.carType}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                >
                                    <option value="국산차">국산차</option>
                                    <option value="수입차">수입차</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="carClass" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    차종
                                </label>
                                <select
                                    id="carClass"
                                    name="carClass"
                                    value={formData.carClass}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                >
                                    <option value="">선택하세요</option>
                                    {carClasses.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    연식 *
                                </label>
                                <input
                                    type="text"
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="예: 22/01식"
                                />
                            </div>

                            <div>
                                <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    등록일
                                </label>
                                <input
                                    type="date"
                                    id="registrationDate"
                                    name="registrationDate"
                                    value={formData.registrationDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 상세 정보 섹션 */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">상세 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    가격 (만원) *
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleNumberChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="숫자만 입력"
                                />
                            </div>

                            <div>
                                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    주행거리 (km)
                                </label>
                                <input
                                    type="text"
                                    id="mileage"
                                    name="mileage"
                                    value={formData.mileage}
                                    onChange={handleNumberChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="숫자만 입력"
                                />
                            </div>

                            <div>
                                <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    연료 *
                                </label>
                                <select
                                    id="fuel"
                                    name="fuel"
                                    value={formData.fuel}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                >
                                    <option value="">선택하세요</option>
                                    {fuelTypes.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    색상
                                </label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="예: 흰색, 검정"
                                />
                            </div>

                            <div>
                                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    변속기
                                </label>
                                <select
                                    id="transmission"
                                    name="transmission"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                >
                                    <option value="">선택하세요</option>
                                    {transmissionTypes.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    지역 *
                                </label>
                                <input
                                    type="text"
                                    id="region"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="예: 서울, 경기"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 이미지 및 URL 섹션 */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">이미지 및 링크</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    이미지 URL
                                </label>
                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div>
                                <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    상세 페이지 URL
                                </label>
                                <input
                                    type="url"
                                    id="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="https://example.com/car-details"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 설명 섹션 */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            차량 상세 설명
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            placeholder="차량에 대한 상세 설명을 입력하세요..."
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => onSuccess && onSuccess()}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                저장 중...
                            </span>
                        ) : (
                            isEditMode ? '수정하기' : '등록하기'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminCarForm;