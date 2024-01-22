import Jugadores from '../components/tablaJugadores';
import Oxox from '../components/oxox.tablero'; 
import "./css/game.css"


function PaginaJuego() {
  return (
    <div style={{ display: 'flex' }}>
      <div className='top-jugadores'>
        <Jugadores />
      </div>
      <div className='game'>
        <Oxox />
      </div>
    </div>
  );
}

export default PaginaJuego;
