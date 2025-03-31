import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = ({ userId, setUserId, setFavorites }) => {
    const history = useHistory();
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
        history.push("/login");
    };

    return (
        <header className="bg-header">
            <div className="header-container">
                <Link to="/" className="header-logo">
                    AutoFinder
                </Link>
                <nav className="header-nav">
                    {token ? (
                        <div className="header-user">
                            <span className="header-user-id">
                                <span className="mr-1">안녕하세요,</span>
                                <strong>{userId || "사용자"}</strong>
                                <span>님</span>
                            </span>
                            <button onClick={handleLogout} className="header-button">
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <div className="header-auth">
                            <Link to="/login" className="header-link">로그인</Link>
                            <Link to="/register" className="header-register-link">회원가입</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;