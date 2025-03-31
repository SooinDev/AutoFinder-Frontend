import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">페이지를 찾을 수 없습니다</p>
            <p className="not-found-description">
                찾으시는 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
            </p>
            <Link to="/" className="home-button">
                홈으로 돌아가기
            </Link>
        </div>
    );
};

export default NotFoundPage;