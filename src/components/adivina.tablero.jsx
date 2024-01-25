import { useState } from 'react';

const App = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guessedNumber1, setGuessedNumber1] = useState('');
  const [guessedNumber2, setGuessedNumber2] = useState('');
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');

  const startGame = (chosenNumber) => {
    if (chosenNumber < 1 || chosenNumber > 50) {
      setResult1('Por favor, elige un número válido entre 1 y 50.');
    } else {
      setTargetNumber(chosenNumber);
      setResult1('');
    }
  };

  const restartGame = () => {
    setTargetNumber(null);
    setGuessedNumber1('');
    setGuessedNumber2('');
    setResult1('');
    setResult2('');
  };


  const handleGuess2 = () => {
    const guessed = parseInt(guessedNumber2, 10);

    if (isNaN(guessed) || guessed < 1 || guessed > 50) {
      setResult2('Por favor, ingresa un número válido entre 1 y 50.');
    } else if (guessed === targetNumber) {
      setResult2('¡Adivinaste! El número correcto es ' + targetNumber);
      setResult1('¡El Jugador 2 adivinó el número!');
    } else if (guessed < targetNumber) {
      setResult2('Número incorrecto. El número objetivo es mayor. ¡Sigue intentando!');
    } else {
      setResult2('Número incorrecto. El número objetivo es menor. ¡Sigue intentando!');
    }
  };

  return (
    <div>
      <h1>Adivina el Número</h1>
      {targetNumber === null ? (
        <>
          <p>Jugador 1, elige un número entre 1 y 50:</p>
          <input
            type="number"
            onChange={(e) => setGuessedNumber1(e.target.value)}
          />
          <button onClick={() => startGame(parseInt(guessedNumber1, 10))}>
            Comenzar Juego
          </button>
          <p>{result1}</p>
        </>
      ) : (
        <>
          <div>
            <p>Jugador 2, adivina el número:</p>
            <input
              type="number"
              value={guessedNumber2}
              onChange={(e) => setGuessedNumber2(e.target.value)}
            />
            <button onClick={handleGuess2}>Adivinar</button>
            <p>{result2}</p>
          </div>
          <button onClick={restartGame}>Reiniciar Juego</button>
        </>
      )}
    </div>
  );
};

export default App;
