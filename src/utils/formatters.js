/**
 * 가격을 포맷팅하는 함수
 * @param {number|null} price - 가격 (만원)
 * @returns {string} 포맷팅된 가격
 */
export const formatPrice = (price) => {
    if (price == null || isNaN(price)) {
        return '정보 없음';
    }
    return price.toLocaleString('ko-KR');
};

/**
 * 숫자를 포맷팅하는 함수
 * @param {number|string|null} value - 포맷팅할 숫자
 * @returns {string} 포맷팅된 숫자
 */
export const formatNumber = (value) => {
    if (value == null || value === '정보 없음') {
        return '정보 없음';
    }

    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(numValue)) {
        return '정보 없음';
    }

    return numValue.toLocaleString('ko-KR');
};

/**
 * 날짜를 포맷팅하는 함수
 * @param {string|Date} date - 포맷팅할 날짜
 * @returns {string} 포맷팅된 날짜
 */
export const formatDate = (date) => {
    if (!date) return '';

    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) {
        return '';
    }

    return d.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};