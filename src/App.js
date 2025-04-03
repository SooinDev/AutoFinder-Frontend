import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ModelAnalysisPage from "./pages/ModelAnalysisPage";
import FavoritesPage from "./pages/FavoritesPage"; // 즐겨찾기 페이지 임포트
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/global.css";

function App() {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        const storedUsername = localStorage.getItem("username") || sessionStorage.getItem("username");

        if (storedUserId && storedUserId !== "null" && storedUserId !== "undefined") {
            setUserId(storedUserId);
        } else {
            setUserId(null);
        }

        if (storedUsername && storedUsername !== "null" && storedUsername !== "undefined") {
            setUsername(storedUsername);
        } else {
            setUsername(null);
        }
    }, []);

    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Header userId={userId} username={username} setUserId={setUserId} setUsername={setUsername} setFavorites={setFavorites}/>
                <main className="flex-grow">
                    <Switch>
                        <Route exact path="/">
                            <HomePage userId={userId} username={username} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>
                        <Route exact path="/cars">
                            <CarListPage userId={userId} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>
                        <Route path="/cars/:id">
                            <CarDetailPage userId={userId} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>
                        <Route path="/login">
                            <LoginPage setUserId={setUserId} setUsername={setUsername}/>
                        </Route>
                        <Route path="/register">
                            <RegisterPage/>
                        </Route>
                        <Route path="/analysis/:model?">
                            <ModelAnalysisPage />
                        </Route>
                        {/* 즐겨찾기 페이지 라우트 추가 */}
                        <Route path="/favorites">
                            <FavoritesPage userId={userId} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>
                        <Route path="*">
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </main>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}

export default App;