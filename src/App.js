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
import FavoritesPage from "./pages/FavoritesPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCarManagement from "./pages/admin/AdminCarManagement";
import AdminRoute from "./components/auth/AdminRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { JwtUtil } from "./utils/JwtUtil"; // JwtUtil 추가
import "./styles/global.css";

function App() {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        const storedUsername = localStorage.getItem("username") || sessionStorage.getItem("username");
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

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

        // 토큰에서 역할 정보 확인
        if (token) {
            try {
                const role = JwtUtil.extractRole(token);
                console.log("App.js에서 확인한 역할:", role); // 디버깅용 로그
                const adminStatus = role && role.toLowerCase() === 'admin';
                console.log("관리자 상태:", adminStatus); // 디버깅용 로그
                setIsAdmin(adminStatus);
            } catch (error) {
                console.error("관리자 권한 확인 오류:", error);
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }, []);

    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Header
                    userId={userId}
                    username={username}
                    setUserId={setUserId}
                    setUsername={setUsername}
                    setFavorites={setFavorites}
                    isAdmin={isAdmin} // isAdmin 전달
                />
                <main className="flex-grow">
                    <Switch>
                        <Route exact path="/">
                            <HomePage userId={userId} username={username} favorites={favorites} setFavorites={setFavorites} isAdmin={isAdmin} />
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
                        <Route path="/favorites">
                            <FavoritesPage userId={userId} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>

                        {/* 관리자 라우트 */}
                        <AdminRoute exact path="/admin" component={AdminDashboard} />
                        <AdminRoute path="/admin/cars" component={AdminCarManagement} />

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