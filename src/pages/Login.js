import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUserId }) => {
    const [formData, setFormData] = useState({ username: "", password: "", rememberMe: false });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", formData);
            const { token, userId } = response.data;

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
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
            {message && <p className="text-center text-red-500">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="아이디"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mt-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mt-2"
                />
                <div className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label>로그인 유지</label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
                >
                    로그인
                </button>
            </form>
        </div>
    );
};

export default Login;