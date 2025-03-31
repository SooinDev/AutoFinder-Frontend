import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../api/services';

const LoginPage = ({ setUserId }) => {
    const [formData, setFormData] = useState({ username: "", password: "", rememberMe: false });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const userData = await login(formData);
            const { token, userId } = userData;

            // "로그인 유지" 체크 여부에 따라 저장 방식 변경
            if (formData.rememberMe) {
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
            } else {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("userId", userId);
            }

            setUserId(userId);
            setMessage("로그인 성공! 차량 목록으로 이동합니다.");
            setTimeout(() => history.push("/"), 1000);
        } catch (error) {
            setMessage("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">로그인</h2>

            {message && (
                <div className={`auth-message ${message.includes('성공') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="form-input"
                        placeholder="아이디를 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="form-input"
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className="form-checkbox">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="checkbox-input"
                    />
                    <label htmlFor="rememberMe" className="checkbox-label">
                        로그인 유지
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="auth-button"
                >
                    {isLoading && (
                        <span className="spinner">
                            <svg className="h-5 w-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    )}
                    {isLoading ? "로그인 중..." : "로그인"}
                </button>
            </form>

            <div className="auth-link">
                계정이 없으신가요? <Link to="/register" className="text-teal-600 hover:underline">회원가입</Link>
            </div>
        </div>
    );
};

export default LoginPage;