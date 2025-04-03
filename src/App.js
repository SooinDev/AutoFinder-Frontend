import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ModelAnalysisPage from "./pages/ModelAnalysisPage";
import { ThemeProvider } from "./ThemeContext";
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
        <ThemeProvider>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Header userId={userId} setUserId={setUserId} setFavorites={setFavorites}/>
                <main className="flex-grow">
                    <Switch>
                        <Route exact path="/">
                            <HomePage userId={userId} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>
                        <Route exact path="/cars">
                            <CarListPage userId={userId} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>
                        <Route path="/cars/:id">
                            <CarDetailPage userId={userId} favorites={favorites} setFavorites={setFavorites}/>
                        </Route>
                        <Route path="/login">
                            <LoginPage setUserId={setUserId}/>
                        </Route>
                        <Route path="/register">
                            <RegisterPage/>
                        </Route>
                        <Route path="/analysis/:model?">
                            <ModelAnalysisPage />
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