import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { JwtUtil } from '../../utils/JwtUtil';

// 관리자 접근 통제 컴포넌트
const AdminRoute = ({ component: Component, ...rest }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // 토큰 확인 및 관리자 권한 체크
        const checkAdminRole = () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (!token) {
                console.log("토큰이 없습니다.");
                setIsAdmin(false);
                setIsChecking(false);
                return;
            }

            try {
                // 토큰에서 사용자 역할 추출
                const role = JwtUtil.extractRole(token);
                console.log("추출된 역할:", role); // 디버깅용 로그

                // 역할 문자열 비교를 대소문자 구분 없이 수행 (role과 'admin'을 모두 소문자로 변환하여 비교)
                const isAdminRole = role && (role.toLowerCase() === 'admin');
                console.log("관리자 권한 여부:", isAdminRole); // 디버깅용 로그

                setIsAdmin(isAdminRole);
            } catch (error) {
                console.error("토큰 검증 오류:", error);
                setIsAdmin(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAdminRole();
    }, []);

    if (isChecking) {
        // 권한 확인 중 로딩 표시
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-teal-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">권한을 확인하는 중입니다...</p>
                </div>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={props =>
                isAdmin ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location, message: "관리자 권한이 필요합니다." }
                        }}
                    />
                )
            }
        />
    );
};

export default AdminRoute;