import React, { useState } from 'react';

const JuegoAdivinanza = () => {
    const [modo, setModo] = useState('elegirRango'); // 'elegirRango' o 'adivinarNumero'
    const [rangoInicial, setRangoInicial] = useState(1);
    const [rangoFinal, setRangoFinal] = useState(100);
    const [numeroAdivinar, setNumeroAdivinar] = useState(null);
    const [numeroAdivinanza, setNumeroAdivinanza] = useState(null);
    const [intentos, setIntentos] = useState(0);
    const [mensaje, setMensaje] = useState('');

    const iniciarJuego = () => {
        if (rangoInicial && rangoFinal && numeroAdivinar) {
            setModo('adivinarNumero');
            reiniciarJuego();
        } else {
            setMensaje('Por favor, completa todos los campos antes de comenzar el juego.');
        }
    };

    const manejarAdivinanza = (numero) => {
        setNumeroAdivinanza(numero);
        setIntentos(intentos + 1);

        if (numero === numeroAdivinar) {
            setMensaje(`¡Felicidades! Adivinaste el número en ${intentos} intentos.`);
            setModo('elegirRango');
        } else {
            const pista = numero < numeroAdivinar ? 'mayor' : 'menor';
            setMensaje(`Incorrecto. El número es ${pista}. Intenta de nuevo.`);
        }
    };

    const reiniciarJuego = () => {
        const numeroAleatorio = Math.floor(Math.random() * (rangoFinal - rangoInicial + 1)) + rangoInicial;
        setNumeroAdivinar(numeroAleatorio);
        setNumeroAdivinanza(null);
        setIntentos(0);
        setMensaje('');
    };

    const generarBotones = () => {
        const botones = [];
        for (let i = rangoInicial; i <= rangoFinal; i++) {
            const botonSeleccionado = i === numeroAdivinanza;
            const botonCorrecto = i === numeroAdivinar;

            botones.push(
                <button
                    key={i}
                    disabled={botonSeleccionado}
                    onClick={() => manejarAdivinanza(i)}
                    style={{
                        backgroundColor: botonCorrecto ? 'green' : botonSeleccionado ? 'gray' : 'white',
                        color: botonSeleccionado || botonCorrecto ? 'white' : 'black',
                    }}
                >
                    {i}
                </button>
            );
        }
        return botones;
    };


    return (
        <div>
            <h1>Juego de Adivinanzas para 2 Jugadores</h1>
            {modo === 'elegirRango' && (
                <>
                    <p>Jugador 1: Elige un rango de números</p>
                    <label>Rango Inicial:</label>
                    <input
                        type="number"
                        value={rangoInicial}
                        onChange={(e) => setRangoInicial(Math.max(1, Math.min(100, parseInt(e.target.value, 10))))}
                    />
                    <label>Rango Final:</label>
                    <input
                        type="number"
                        value={rangoFinal}
                        onChange={(e) => setRangoFinal(Math.max(rangoInicial, Math.min(100, parseInt(e.target.value, 10))))}
                    />
                    <p>Jugador 1: Elige el número a adivinar</p>
                    <input
                        type="number"
                        value={numeroAdivinar}
                        onChange={(e) =>
                            setNumeroAdivinar(Math.max(rangoInicial, Math.min(rangoFinal, parseInt(e.target.value, 10))))
                        }
                    />
                    <button onClick={iniciarJuego}>Iniciar Juego</button>
                </>
            )}
            {modo === 'adivinarNumero' && (
                <>
                    <p>Jugador 2: Selecciona el número</p>
                    <div>{generarBotones()}</div>
                    <p>Intentos: {intentos}</p>
                </>
            )}
            <p>{mensaje}</p>
        </div>
    );
};

export default JuegoAdivinanza;
