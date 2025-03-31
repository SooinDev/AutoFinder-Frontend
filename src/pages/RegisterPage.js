import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

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
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setMessage(err.response?.data || "회원가입에 실패했습니다. 다시 시도해주세요.");
            console.error("회원가입 오류:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">회원가입</h2>
                {message && <p className="register-message">{message}</p>}

                <form onSubmit={handleSubmit} className="register-form">
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
                            className={`form-input ${errors.username ? 'error' : ''}`}
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
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
                            className={`form-input ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="비밀번호를 다시 입력하세요"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="register-button"
                    >
                        {isLoading ? "처리 중..." : "회원가입"}
                    </button>
                </form>

                <p className="login-link">
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;