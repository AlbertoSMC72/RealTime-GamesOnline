import { useState } from 'react';
import './CampusLink.css';
import { FaGoogle } from "react-icons/fa";
function CampusLink() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleSignIn = () => {
        // Implementación de inicio de sesión con Google
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        // Implementación de inicio de sesión normal
    };

    return (
        <div className="campuslink-container">
            <div className="logo">
                <img src='https://se-images.campuslabs.com/clink/images/50147240-3314-4d64-8d52-9e7eee0db232b658b1ff-bf30-4caa-a27c-825c2288a444.png' width='50%' alt="" />
            </div>
            <p>Iniciar Sesión</p>
            <p>!Bienvenido de nuevo! Por favor, Inicia sesion para acceder a tu cuenta</p>
            <form className="form-container" onSubmit={handleSignIn}>
                <h4>Correo Electronico</h4>
                <input
                    type="email"
                    placeholder="Ingrese su Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h4>Contraseña</h4>

                <input
                    type="password"
                    placeholder="Ingrese su Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="submit-button">
                    Iniciar Sesión
                </button>
            </form>
            <div className='separacion'>
                <hr />
                <p style={{fontSize:'1rem'}}>Ó</p>
                <hr />
            </div>
            <button className="google-button" onClick={handleGoogleSignIn}>
            <FaGoogle size={20}/>
                <a style={{marginLeft:'1rem'}}>
                Iniciar Sesión con Google
                </a>
                
            </button>

            <p>
                ¿No tienes una cuenta?  <a href="/register">!Registrate ahora!</a>
            </p>
        </div>
    );
}

export default CampusLink;