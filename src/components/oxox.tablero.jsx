import { useState } from "react";

const Board = () => {
    const initialBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    const [board, setBoard] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const handleClick = (row, col) => {
        if (!board[row][col] && !winner) {
            const newBoard = [...board];
            newBoard[row][col] = currentPlayer;
            setBoard(newBoard);

            if (checkWinner(row, col)) {
                setWinner(currentPlayer);
            } else {
                setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
            }
        }
    };

    const checkWinner = (row, col) => {
        // Check row
        if (
            board[row][0] === currentPlayer &&
            board[row][1] === currentPlayer &&
            board[row][2] === currentPlayer
        ) {
            return true;
        }

        // Check column
        if (
            board[0][col] === currentPlayer &&
            board[1][col] === currentPlayer &&
            board[2][col] === currentPlayer
        ) {
            return true;
        }

        // Check diagonals
        if (
            (row === col || row + col === 2) &&
            board[0][0] === currentPlayer &&
            board[1][1] === currentPlayer &&
            board[2][2] === currentPlayer
        ) {
            return true;
        }

        if (
            (row === 0 && col === 2) ||
            (row === 2 && col === 0) ||
            (row === 1 && col === 1)
        ) {
            if (
                board[0][2] === currentPlayer &&
                board[1][1] === currentPlayer &&
                board[2][0] === currentPlayer
            ) {
                return true;
            }
        }

        return false;
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setCurrentPlayer("X");
        setWinner(null);
    };

    return (
        <div>
            <div>
                {winner ? (
                    <p>¡Ganador: {winner}!</p>
                ) : (
                    <p>Turno del jugador: {currentPlayer}</p>
                )}
            </div>
            <div>
                {board.map((row, i) => (
                    <div key={i} style={{ display: "flex" }}>
                        {row.map((cell, j) => (
                            <button
                                key={j}
                                onClick={() => handleClick(i, j)}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    fontSize: "20px",
                                    border: "1px solid #ccc",
                                    backgroundColor: cell === "" ? "white" : cell === "X" ? "#ffcccb" : "#b3e6b3",
                                    margin: "5px",
                                }}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={resetGame}>Reiniciar Juego</button>
        </div>
    );
};

export default Board;
