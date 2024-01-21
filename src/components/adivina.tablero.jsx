import React, { useState } from 'react';

const JuegoAdivinanza = () => {
  const [modo, setModo] = useState('elegirNumero'); // 'elegirNumero' o 'adivinarNumero'
  const [numeroElegido, setNumeroElegido] = useState(0);
  const [numeroAdivinanza, setNumeroAdivinanza] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [mensaje, setMensaje] = useState('');

  const iniciarJuego = (numero) => {
    setNumeroElegido(numero);
    setModo('adivinarNumero');
  };

  const manejarAdivinanza = () => {
    const numeroAdivinado = parseInt(numeroAdivinanza, 10);

    if (isNaN(numeroAdivinado)) {
      setMensaje('Por favor, ingresa un número válido.');
      return;
    }

    setIntentos(intentos + 1);

    if (numeroAdivinado === numeroElegido) {
      setMensaje(`¡Felicidades! Adivinaste el número en ${intentos} intentos.`);
      setModo('elegirNumero');
    } else {
      const pista = numeroAdivinado < numeroElegido ? 'mayor' : 'menor';
      setMensaje(`Incorrecto. Intenta con un número ${pista}.`);
    }
  };

  return (
    <div>
      <h1>Juego de Adivinanzas para 2 Jugadores</h1>
      {modo === 'elegirNumero' && (
        <>
          <p>Jugador 1: Elige un número entre 1 y 100</p>
          <input
            type="text"
            value={numeroElegido}
            onChange={(e) => setNumeroElegido(e.target.value)}
          />
          <button onClick={() => iniciarJuego(numeroElegido)}>Iniciar Juego</button>
        </>
      )}
      {modo === 'adivinarNumero' && (
        <>
          <p>Jugador 2: Intenta adivinar el número</p>
          <input
            type="text"
            value={numeroAdivinanza}
            onChange={(e) => setNumeroAdivinanza(e.target.value)}
          />
          <button onClick={manejarAdivinanza}>Adivinar</button>
        </>
      )}
      <p>{mensaje}</p>
    </div>
  );
};

export default JuegoAdivinanza;
