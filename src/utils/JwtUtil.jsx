// JWT 토큰 처리 유틸리티
export class JwtUtil {
    /**
     * JWT 토큰에서 페이로드 부분 추출
     * @param {string} token JWT 토큰
     * @returns {Object} 디코딩된 페이로드 객체
     */
    static decodeToken(token) {
        if (!token) {
            throw new Error('토큰이 제공되지 않았습니다.');
        }

        try {
            // JWT는 'header.payload.signature' 형식
            const base64Payload = token.split('.')[1];
            // Base64 디코딩 (패딩 문제 해결)
            const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
            const payload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(payload);
        } catch (error) {
            console.error('JWT 디코딩 오류:', error);
            throw new Error('잘못된 토큰 형식입니다.');
        }
    }

    /**
     * JWT 토큰에서 사용자 ID 추출
     * @param {string} token JWT 토큰
     * @returns {string|null} 사용자 ID 또는 null
     */
    static extractUserId(token) {
        try {
            const payload = this.decodeToken(token);
            return payload.userId || payload.sub || null;
        } catch (error) {
            console.error('사용자 ID 추출 오류:', error);
            return null;
        }
    }

    /**
     * JWT 토큰에서 사용자 역할 추출
     * @param {string} token JWT 토큰
     * @returns {string|null} 사용자 역할 또는 null
     */
    static extractRole(token) {
        try {
            const payload = this.decodeToken(token);
            // role 속성이 다양한 위치에 있을 수 있으므로 여러 경우 확인
            // "ROLE_" 접두사가 있는 경우 제거
            const role = payload.role ||
                (payload.authorities && payload.authorities[0]) ||
                (payload.roles && payload.roles[0]) ||
                null;

            // "ROLE_" 접두사가 있으면 제거
            return role ? role.replace('ROLE_', '') : null;
        } catch (error) {
            console.error('사용자 역할 추출 오류:', error);
            return null;
        }
    }

    /**
     * 토큰 만료 여부 확인
     * @param {string} token JWT 토큰
     * @returns {boolean} 만료 여부
     */
    static isTokenExpired(token) {
        try {
            const payload = this.decodeToken(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp ? payload.exp < currentTime : true;
        } catch (error) {
            console.error('토큰 만료 확인 오류:', error);
            return true;
        }
    }
}