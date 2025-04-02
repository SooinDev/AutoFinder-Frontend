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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    로그인
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    계정이 없으신가요?{' '}
                    <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
                        회원가입
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {message && (
                        <div className={`mb-4 rounded-md p-4 ${message.includes('성공') ? 'bg-green-50' : 'bg-red-50'}`}>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    {message.includes('성공') ? (
                                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm font-medium ${message.includes('성공') ? 'text-green-800' : 'text-red-800'}`}>
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                아이디
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    placeholder="아이디를 입력하세요"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                비밀번호
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    placeholder="비밀번호를 입력하세요"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                    disabled={isLoading}
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                    로그인 유지
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        로그인 중...
                                    </>
                                ) : (
                                    "로그인"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;