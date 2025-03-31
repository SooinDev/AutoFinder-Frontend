import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/services';

const LoginPage = ({ setUserId }) => {
    const [formData, setFormData] = useState({ username: "", password: "", rememberMe: false });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
            setMessage("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">로그인</h2>
                {message && <p className="login-message">{message}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">아이디</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="아이디를 입력하세요"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="form-input"
                        />
                    </div>

                    <div className="form-checkbox">
                        <input
                            id="rememberMe"
                            type="checkbox"
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
                        className="login-button"
                    >
                        {isLoading ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                <p className="register-link">
                    계정이 없으신가요? <Link to="/register">회원가입</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;