import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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
        <div className="flex flex-col min-h-screen bg-gray-50">
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
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-center md:justify-start">
                            <h3 className="text-lg font-bold text-gray-900">AutoFinder</h3>
                        </div>
                        <div className="mt-8 md:mt-0">
                            <p className="text-center text-base text-gray-500">
                                &copy; {new Date().getFullYear()} AutoFinder. 모든 권리 보유.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;