import { useState } from 'react';
import io from 'socket.io-client';

export function Chat() {
    const [mensaje, setMensaje] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    const socket = io('http://localhost:8080');

    // Eventos del cliente
    socket.on('mensaje', (mensaje) => {
        setMensajes([...mensajes, mensaje]);
    });

    socket.on('usuarios', (usuarios) => {
        setUsuarios(usuarios);
    });

    // Funciones del cliente
    const enviarMensaje = () => {
        socket.emit('mensaje', mensaje);
        setMensaje('');
    };

    return (
        <div>
            <h1>Chat</h1>
            <input
                type="text"
                placeholder="Mensaje"
                onChange={(e) => setMensaje(e.target.value)}
            />
            <button onClick={enviarMensaje}>Enviar</button>
            <ul>
                {mensajes.map((mensaje) => (
                    <li key={mensaje.id}>{mensaje.usuario}: {mensaje.mensaje}</li>
                ))}
            </ul>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>{usuario.nombre}</li>
                ))}
            </ul>
        </div>
    );
}

