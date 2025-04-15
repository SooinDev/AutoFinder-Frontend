import React, { createContext, useState, useEffect } from 'react';

// 테마 컨텍스트 생성
export const ThemeContext = createContext({
    darkMode: false,
    toggleDarkMode: () => {},
});

// 테마 프로바이더 컴포넌트
export const ThemeProvider = ({ children }) => {
    // localStorage에서 테마 설정 불러오기 (초기값은 시스템 설정 또는 라이트 모드)
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            return savedTheme === 'true';
        }
        // 시스템 테마 설정에 따라 초기값 설정
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // 다크 모드 토글 함수
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    // 다크 모드 변경 시 localStorage에 저장 및 HTML 클래스 업데이트
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // 시스템 테마 변경 감지
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const savedTheme = localStorage.getItem('darkMode');
            // localStorage에 저장된 테마 설정이 없는 경우에만 시스템 설정 따르기
            if (savedTheme === null) {
                setDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};