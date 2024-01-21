import Jugadores from '../components/tablaJugadores';
import Tablero from '../components/tablero';  // Asegúrate de importar el componente correcto
import "./css/game.css"

function PaginaJuego() {
    return (
        <div style={{ display: 'flex' }}>
            <div className='top-jugadores'>
                <Jugadores />
            </div>
            <div className='game'>
                <Tablero />
            </div>
        </div>
    );
}

export default PaginaJuego;
