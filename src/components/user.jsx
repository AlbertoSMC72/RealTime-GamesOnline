import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCreateAccount = () => {
    const [name, setname] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreatingAccount] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/Game");
        }
    }, [isLoggedIn, navigate]);

    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem("token", token);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            });
            if (response.status === 200) {
                const data = await response.json();
                saveTokenToLocalStorage(data.token);
                setIsLoggedIn(true);
                
/*                 socket.auth = { token: data.token };
                socket.connect(); */
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateAccount = async () => {
        try {
            const response = await fetch("http://localhost:8080/user/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            });
            if (response.status === 201) {
                alert("Cuenta creada");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h1>Estás conectado</h1>
                    <button onClick={() => navigate("/Game")}>Ir al juego</button>
                </div>
            ) : (
                <div>
                    {isCreatingAccount ? (
                        <div>
                            <h1>Creando cuenta...</h1>
                        </div>
                    ) : (
                        <div>
                            <h1>Inicia sesión o crea una cuenta</h1>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Usuario"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handleLogin}>Iniciar sesión</button>
                            <button onClick={handleCreateAccount}>Crear cuenta</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginCreateAccount;
