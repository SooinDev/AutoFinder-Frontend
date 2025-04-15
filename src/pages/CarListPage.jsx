import React, { useReducer, useEffect, useCallback } from 'react';
import { fetchCars, fetchFavorites, toggleFavorite } from '../api/services';
import CarFilters from '../components/car/CarFilters';
import CarCard from '../components/car/CarCard';
import Pagination from '../components/common/Pagination';
import { useHistory, useLocation } from 'react-router-dom';

// 초기 상태 정의
const initialState = {
    cars: [],
    favoriteCars: [],
    totalPages: 1,
    currentPage: 0,
    isLoading: false,
    error: null,
    activeTab: 'all',
    filters: {
        model: "", minPrice: "", maxPrice: "",
        minMileage: "", maxMileage: "", fuel: "",
        region: "", year: ""
    },
    initialLoad: true
};

// 리듀서 함수 정의
function carListReducer(state, action) {
    switch (action.type) {
        case 'INITIALIZE_FROM_URL':
            return {
                ...state,
                currentPage: action.page || 0,
                activeTab: action.tab || 'all',
                filters: action.filters || state.filters,
                error: action.tab === 'favorite' && !action.userId
                    ? "즐겨찾기 목록을 보려면 로그인이 필요합니다."
                    : null
            };
        case 'SET_CARS':
            return {
                ...state,
                cars: action.payload.content || [],
                totalPages: action.payload.totalPages || 1,
                isLoading: false,
                initialLoad: false
            };
        case 'LOAD_FAVORITES':
            return {
                ...state,
                favoriteCars: action.payload || []
            };
        case 'SET_PAGE':
            return {
                ...state,
                currentPage: action.payload
            };
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.payload,
                // 필터 변경 시 첫 페이지로 리셋
                currentPage: 0
            };
        case 'RESET_FILTERS':
            return {
                ...state,
                filters: {
                    model: "", minPrice: "", maxPrice: "",
                    minMileage: "", maxMileage: "", fuel: "",
                    region: "", year: ""
                },
                currentPage: 0
            };
        case 'SET_TAB':
            return {
                ...state,
                activeTab: action.payload,
                currentPage: 0,
                error: action.payload === 'favorite' && !action.userId
                    ? "즐겨찾기 목록을 보려면 로그인이 필요합니다."
                    : null
            };
        case 'LOADING_START':
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case 'LOADING_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

const CarListPage = ({ userId, favorites, setFavorites, isHomePage }) => {
    const history = useHistory();
    const location = useLocation();
    const [state, dispatch] = useReducer(carListReducer, initialState);

    const {
        cars, favoriteCars, totalPages, currentPage,
        isLoading, error, activeTab, filters, initialLoad
    } = state;

    // URL 파라미터 초기화 (컴포넌트 마운트 시 1회 실행)
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');
        const tab = queryParams.get('tab');

        // 필터 정보 파싱
        const parsedFilters = { ...initialState.filters };
        for (const key of Object.keys(parsedFilters)) {
            const value = queryParams.get(key);
            if (value !== null) {
                parsedFilters[key] = value;
            }
        }

        // URL 정보로 상태 초기화
        dispatch({
            type: 'INITIALIZE_FROM_URL',
            page: page ? parseInt(page) - 1 : 0,
            tab: tab === 'favorite' ? 'favorite' : 'all',
            filters: parsedFilters,
            userId
        });
    }, [location.search, userId]);

    // URL 업데이트 함수
    const updateUrl = useCallback(() => {
        const params = new URLSearchParams();

        // 페이지 정보 (1부터 시작하도록 변환)
        params.set('page', currentPage + 1);

        // 탭 정보
        if (activeTab === 'favorite') {
            params.set('tab', 'favorite');
        }

        // 필터 정보 (값이 있는 필터만)
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                params.set(key, value);
            }
        }

        // URL 업데이트
        const newUrl = `${location.pathname}?${params.toString()}`;
        history.replace(newUrl);
    }, [history, location.pathname, currentPage, activeTab, filters]);

    // 차량 데이터 로드 함수
    const loadCars = useCallback(async () => {
        if (isHomePage || activeTab === 'favorite') return;

        dispatch({ type: 'LOADING_START' });

        try {
            const pageSize = 21;
            const data = await fetchCars(filters, currentPage, pageSize);

            dispatch({ type: 'SET_CARS', payload: data });

            // 페이지가 총 페이지 수보다 크면 첫 페이지로 리셋
            if (currentPage >= data.totalPages && data.totalPages > 0) {
                dispatch({ type: 'SET_PAGE', payload: 0 });
            }
        } catch (err) {
            console.error("차량 목록 로드 실패:", err);
            dispatch({
                type: 'LOADING_ERROR',
                payload: "차량 목록을 불러오는 데 실패했습니다."
            });
        }
    }, [isHomePage, activeTab, filters, currentPage]);

    // 즐겨찾기 목록 로드 함수
    const loadFavorites = useCallback(async () => {
        if (!userId) {
            setFavorites(new Set());
            dispatch({ type: 'LOAD_FAVORITES', payload: [] });
            return;
        }

        try {
            const favoritesData = await fetchFavorites(userId);
            setFavorites(new Set(favoritesData.map(car => car.id)));
            dispatch({ type: 'LOAD_FAVORITES', payload: favoritesData || [] });
        } catch (err) {
            console.error("즐겨찾기 로드 실패:", err);
        }
    }, [userId, setFavorites]);

    // 상태가 변경될 때 URL 업데이트 (단, 초기 로드가 아닐 때만)
    useEffect(() => {
        if (!initialLoad && !isHomePage) {
            updateUrl();
        }
    }, [currentPage, activeTab, filters, initialLoad, updateUrl, isHomePage]);

    // 페이지, 필터, 탭 변경 시 데이터 로드
    useEffect(() => {
        if (!isHomePage && !initialLoad && activeTab === 'all') {
            loadCars();
        }
    }, [isHomePage, initialLoad, activeTab, currentPage, filters, loadCars]);

    // 초기 데이터 로드
    useEffect(() => {
        if (initialLoad && !isHomePage) {
            loadCars();
        }
    }, [initialLoad, isHomePage, loadCars]);

    // 사용자 ID 변경 시 즐겨찾기 로드
    useEffect(() => {
        loadFavorites();
    }, [userId, loadFavorites]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        dispatch({ type: 'SET_PAGE', payload: newPage });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 탭 변경 핸들러
    const handleTabChange = (tab) => {
        if (tab === 'favorite' && !userId) {
            alert('로그인이 필요합니다.');
            return;
        }

        dispatch({ type: 'SET_TAB', payload: tab, userId });
    };

    // 검색 기능
    const handleSearch = () => {
        // 검색 시 첫 페이지로 이동 (이미 SET_FILTERS에서 처리됨)
        loadCars();
    };

    // 필터 변경 핸들러
    const handleFiltersChange = (newFilters) => {
        dispatch({ type: 'SET_FILTERS', payload: newFilters });
    };

    // 필터 초기화
    const handleResetFilters = () => {
        dispatch({ type: 'RESET_FILTERS' });
        loadCars();
    };

    // 즐겨찾기 토글
    const handleToggleFavorite = async (carId) => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await toggleFavorite(carId, userId, favorites.has(carId));

            // 즐겨찾기 상태 업데이트
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(carId)) {
                    newFavorites.delete(carId);
                } else {
                    newFavorites.add(carId);
                }
                return newFavorites;
            });

            // 즐겨찾기 목록 갱신
            loadFavorites();
        } catch (err) {
            console.error("즐겨찾기 업데이트 실패:", err);
            alert("즐겨찾기 처리 중 오류가 발생했습니다.");
        }
    };

    // 즐겨찾기 탭의 페이지네이션을 위한 데이터 계산
    const getFavoritePageData = () => {
        const pageSize = 21;
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageItems = favoriteCars.slice(startIndex, endIndex);
        const totalFavoritePages = Math.ceil(favoriteCars.length / pageSize) || 1;

        return {
            items: currentPageItems,
            totalPages: totalFavoritePages
        };
    };

    // 홈페이지 내 간소화된 UI
    if (isHomePage) {
        return (
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center">
                        <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <>
                        {cars.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map(car => (
                                    <CarCard
                                        key={car.id}
                                        car={car}
                                        isFavorite={favorites.has(car.id)}
                                        onToggleFavorite={handleToggleFavorite}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">등록된 차량이 없습니다</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }

    // 현재 표시할 차량 목록과 페이지 수 결정
    let displayCars = cars;
    let displayTotalPages = totalPages;

    // 즐겨찾기 탭인 경우
    if (activeTab === 'favorite') {
        const favoritePageData = getFavoritePageData();
        displayCars = favoritePageData.items;
        displayTotalPages = favoritePageData.totalPages;
    }

    // 일반 CarListPage UI
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                        {activeTab === 'favorite' ? '즐겨찾기한 차량' : '중고차 찾기'}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {activeTab === 'favorite' ?
                            '관심 있는 차량들을 모아봤습니다.' :
                            '원하는 조건의 차량을 검색하고 비교해보세요.'}
                    </p>
                </div>
            </div>

            <CarFilters
                filters={filters}
                setFilters={handleFiltersChange}
                onSearch={handleSearch}
                onReset={handleResetFilters}
            />

            {/* 탭 네비게이션 */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => handleTabChange('all')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            activeTab === 'all'
                                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        전체 차량
                    </button>
                    <button
                        onClick={() => handleTabChange('favorite')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            activeTab === 'favorite'
                                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                        즐겨찾기
                    </button>
                </nav>
            </div>

            {/* 오류 메시지 */}
            {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400 dark:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 로딩 상태 */}
            {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center">
                    <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm text-gray-500 dark:text-gray-400">차량 정보를 불러오는 중...</p>
                </div>
            ) : (
                <>
                    {/* 필터 선택 시 표시할 정보 */}
                    {filters.model && (
                        <div className="mb-6 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-3 rounded-md">
                            <p className="text-blue-700 dark:text-blue-300 text-sm">
                                <span className="font-semibold">{filters.model}</span> 검색 결과
                                {displayCars.length > 0 && ` (${displayCars.length}개)`}
                                {currentPage > 0 && ` - 페이지 ${currentPage + 1}/${displayTotalPages}`}
                            </p>
                        </div>
                    )}

                    {/* 차량 목록 */}
                    {displayCars.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayCars.map(car => (
                                <CarCard
                                    key={car.id}
                                    car={car}
                                    isFavorite={favorites.has(car.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {activeTab === 'favorite' ? '즐겨찾기한 차량이 없습니다.' : '검색 조건에 맞는 차량이 없습니다.'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {activeTab === 'favorite' ?
                                    '관심 있는 차량을 즐겨찾기에 추가해보세요.' :
                                    '다른 검색 조건을 선택해보세요.'}
                            </p>
                        </div>
                    )}

                    {/* 페이지네이션 - 페이지 번호를 1부터 시작하도록 수정 */}
                    {displayCars.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={displayTotalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default CarListPage;