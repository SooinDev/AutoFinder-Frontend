import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../api/services';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // 필드 변경 시 해당 필드의 오류 메시지 제거
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = "아이디를 입력해주세요.";
        } else if (formData.username.length < 3) {
            newErrors.username = "아이디는 3자 이상이어야 합니다.";
        }

        if (!formData.password) {
            newErrors.password = "비밀번호를 입력해주세요.";
        } else if (formData.password.length < 6) {
            newErrors.password = "비밀번호는 6자 이상이어야 합니다.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            await register({
                username: formData.username,
                password: formData.password,
            });

            setMessage("회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.");
            setTimeout(() => history.push("/login"), 2000);
        } catch (err) {
            setMessage(err.response?.data || "회원가입에 실패했습니다. 다시 시도해주세요.");
            console.error("회원가입 오류:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">회원가입</h2>

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
                        className={`form-input ${errors.username ? 'error' : ''}`}
                        placeholder="아이디를 입력하세요"
                    />
                    {errors.username && <p className="error-text">{errors.username}</p>}
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
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        placeholder="비밀번호를 입력하세요"
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        placeholder="비밀번호를 다시 입력하세요"
                    />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
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
                    {isLoading ? "처리 중..." : "회원가입"}
                </button>
            </form>

            <div className="auth-link">
                이미 계정이 있으신가요? <Link to="/login" className="text-teal-600 hover:underline">로그인</Link>
            </div>
        </div>
    );
};

export default RegisterPage;