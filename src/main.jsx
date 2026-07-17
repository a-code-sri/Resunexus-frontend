import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider  } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/app"
                    element={
                        <ProtectedRoute>

                            <App />

                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
      </AuthProvider>

    </React.StrictMode>

);