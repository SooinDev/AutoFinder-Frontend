import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    const [userId, setUserId] = useState(null);
    const [favorites, setFavorites] = useState(new Set());  // 추가됨

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId && storedUserId !== "null" && storedUserId !== "undefined") {
            setUserId(storedUserId);
        } else {
            setUserId(null);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* setFavorites를 props로 Navbar에 전달 */}
            <Navbar userId={userId} setUserId={setUserId} setFavorites={setFavorites} />
            <main className="flex-grow container mx-auto p-6">
                {/* setFavorites를 CarList에도 전달 */}
                <Routes>
                    <Route path="/" element={<CarList userId={userId} setFavorites={setFavorites} />} />
                    <Route path="/cars/:id" element={<CarDetail />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setUserId={setUserId} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;