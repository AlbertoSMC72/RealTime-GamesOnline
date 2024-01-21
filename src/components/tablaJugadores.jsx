import { useState, useEffect } from 'react';

function Jugadores() {
    const [jugadores, setJugadores] = useState([]);

    useEffect(() => {
        // Simulación de datos de jugadores (puedes cargarlos desde una API o base de datos)
        const datosJugadores = [
            { id_usuario: 1, nombre_usuario: 'Usuario1', record: '100' },
            { id_usuario: 2, nombre_usuario: 'Usuario2', record: '80' },
            { id_usuario: 3, nombre_usuario: 'Usuario3', record: '120' },
            // ... otros datos de jugadores
        ];

        // Ordenar la lista de jugadores por récord (de mayor a menor)
        const jugadoresOrdenados = datosJugadores.sort((a, b) => parseInt(b.record) - parseInt(a.record));

        setJugadores(jugadoresOrdenados);
    }, []);

    return (
        <div>
            <h2>Top Jugadores</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Usuario</th>
                        <th>Nombre Usuario</th>
                        <th>Récord</th>
                    </tr>
                </thead>
                <tbody>
                    {jugadores.map((jugador) => (
                        <tr key={jugador.id_usuario}>
                            <td>{jugador.id_usuario}</td>
                            <td>{jugador.nombre_usuario}</td>
                            <td>{jugador.record}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Jugadores;
