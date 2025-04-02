import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-9xl font-extrabold text-teal-600">404</h1>
                <p className="mt-4 text-xl font-bold text-gray-900">페이지를 찾을 수 없습니다</p>
                <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                    찾으시는 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
                </p>
                <div className="mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;