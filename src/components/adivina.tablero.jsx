import { useState, useEffect } from 'react';

const JuegoAdivinanza = () => {
    const [modo, setModo] = useState('elegirRango');
    const [rangoInicial, setRangoInicial] = useState(1);
    const [rangoFinal, setRangoFinal] = useState(100);
    const [numeroAdivinar, setNumeroAdivinar] = useState(null);
    const [numeroAdivinanza, setNumeroAdivinanza] = useState(null);
    const [intentos, setIntentos] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    useEffect(() => {
        if (mostrarRespuesta) {
            const timeoutId = setTimeout(() => {
                reiniciarJuego();
                setMostrarRespuesta(false);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [mostrarRespuesta]);

    const validarRangosYNumero = () => {
        if (isNaN(rangoInicial) || isNaN(rangoFinal) || isNaN(numeroAdivinar)) {
            setMensaje('Por favor, ingresa números válidos.');
            return false;
        }

        if (rangoInicial < 1 || rangoInicial > 100 || rangoFinal < rangoInicial || rangoFinal > 100) {
            setMensaje('Los rangos deben estar entre 1 y 100, y el rango final debe ser mayor o igual al rango inicial.');
            return false;
        }

        if (numeroAdivinar < rangoInicial || numeroAdivinar > rangoFinal) {
            setMensaje('El número a adivinar debe estar dentro del rango seleccionado.');
            return false;
        }

        return true;
    };

    const iniciarJuego = () => {
        if (validarRangosYNumero()) {
            setModo('adivinarNumero');
            reiniciarJuego();
        }
    };

    const manejarAdivinanza = (numero) => {
        setNumeroAdivinanza(numero);
        setIntentos(intentos + 1);

        if (numero === numeroAdivinar) {
            setMensaje(`¡Felicidades! Adivinaste el número en ${intentos} intentos.`);
            setModo('elegirRango');
            setMostrarRespuesta(true);
        } else {
            const pista = numero < numeroAdivinar ? 'mayor' : 'menor';
            setMensaje(`Incorrecto. El número es ${pista}. Intenta de nuevo.`);
        }
    };

    const reiniciarJuego = () => {
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
                    onClick={() => manejarAdivinanza(i)}
                    style={{
                        backgroundColor: mostrarRespuesta && botonCorrecto ? 'green' : mostrarRespuesta && botonSeleccionado ? 'gray' : 'white',
                        color: mostrarRespuesta && (botonSeleccionado || botonCorrecto) ? 'white' : 'black',
                        width: '40px',
                        height: '40px',
                        margin: '5px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: mostrarRespuesta ? 'not-allowed' : 'pointer',
                    }}
                >
                    {i}
                </button>
            );
        }
        return botones;
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Juego de Adivinanzas para 2 Jugadores</h1>
            {modo === 'elegirRango' && (
                <>
                    <p>Jugador 1: Elige un rango de números</p>
                    <label>Rango Inicial:</label>
                    <input
                        type="number"
                        value={rangoInicial}
                        onChange={(e) => setRangoInicial(Math.max(1, Math.min(100, parseInt(e.target.value, 10))))}
                        style={{ margin: '5px' }}
                    />
                    <label>Rango Final:</label>
                    <input
                        type="number"
                        value={rangoFinal}
                        onChange={(e) => setRangoFinal(Math.max(rangoInicial, Math.min(100, parseInt(e.target.value, 10))))}
                        style={{ margin: '5px' }}
                    />
                    <p>Jugador 1: Elige el número a adivinar</p>
                    <input
                        type="number"
                        value={numeroAdivinar}
                        onChange={(e) =>
                            setNumeroAdivinar(Math.max(rangoInicial, Math.min(rangoFinal, parseInt(e.target.value, 10))))
                        }
                        style={{ margin: '5px' }}
                    />
                    <button onClick={iniciarJuego} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
                        Iniciar Juego
                    </button>
                </>
            )}
            {modo === 'adivinarNumero' && (
                <>
                    <p>Jugador 2: Selecciona el número</p>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>{generarBotones()}</div>
                    <p style={{ marginTop: '10px' }}>Intentos: {intentos}</p>
                </>
            )}
            <p style={{ marginTop: '10px', fontSize: '18px', color: mostrarRespuesta ? 'green' : 'black' }}>{mensaje}</p>
        </div>
    );
};

export default JuegoAdivinanza;
