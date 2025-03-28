import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 회원가입 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                username: formData.username,
                password: formData.password,
            });

            if (response.status === 200) {
                setMessage("회원가입 성공! 로그인 페이지로 이동합니다.");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            setMessage(`${error.response?.data || "회원가입 실패"}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mt-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Register;