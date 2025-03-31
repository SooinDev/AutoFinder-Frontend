import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/global.css";

function App() {
    const [userId, setUserId] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        if (storedUserId && storedUserId !== "null" && storedUserId !== "undefined") {
            setUserId(storedUserId);
        } else {
            setUserId(null);
        }
    }, []);

    return (
        <div className="app">
            <Header userId={userId} setUserId={setUserId} setFavorites={setFavorites} />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<CarListPage userId={userId} favorites={favorites} setFavorites={setFavorites} />} />
                    <Route path="/cars/:id" element={<CarDetailPage />} />
                    <Route path="/login" element={<LoginPage setUserId={setUserId} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;