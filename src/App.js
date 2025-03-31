import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";
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
        <div className="flex flex-col min-h-screen">
            <Header userId={userId} setUserId={setUserId} setFavorites={setFavorites} />
            <main className="flex-grow">
                <Switch>
                    <Route exact path="/">
                        <CarListPage userId={userId} favorites={favorites} setFavorites={setFavorites} />
                    </Route>
                    <Route path="/cars/:id">
                        <CarDetailPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage setUserId={setUserId} />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </main>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <p className="text-lg font-semibold">AutoFinder</p>
                            <p className="text-sm text-gray-400">© {new Date().getFullYear()} 모든 권리 보유</p>
                        </div>
                        <div className="text-sm text-gray-400">
                            <p>본 사이트는 학습 및 데모 목적으로 제작되었습니다.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;