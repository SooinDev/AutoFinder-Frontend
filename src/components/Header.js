import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ userId, setUserId, setFavorites }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");

        if (typeof setFavorites === 'function') {
            setFavorites(new Set());
        }

        setUserId(null);
        navigate("/login");
    };

    return (
        <header className="bg-header">
            <div className="header-container">
                <Link to="/" className="header-logo">AutoFinder</Link>
                <nav className="header-nav">
                    {token ? (
                        <div className="header-user">
                            <span className="header-user-id">ID: {userId || "알 수 없음"}</span>
                            <button onClick={handleLogout} className="header-button">로그아웃</button>
                        </div>
                    ) : (
                        <div className="header-auth">
                            <Link to="/login" className="header-link">로그인</Link>
                            <Link to="/register" className="header-link">회원가입</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;