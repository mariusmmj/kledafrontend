import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import kledaLogo from "../images/kleda.png";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: bytt ut med ekte auth når backend er klar
        if (username.trim() && password.trim()) {
            navigate("/dashboard");
        } else {
            // evt. vis en enkel feilmelding senere
            alert("Skriv inn brukernavn og passord");
        }
    };

    return (
        <div className="login-page">
            {/* Topplinje med logo */}
            <header className="login-header">
                <img src={kledaLogo} alt="Kleda logo" className="login-logo" />
            </header>

            {/* Selve login-boksen */}
            <main className="login-main">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="login-label">
                        Username
                        <input
                            className="login-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label className="login-label">
                        Password
                        <input
                            className="login-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </main>
        </div>
    );
};

export default LoginPage;
