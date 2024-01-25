import Jugadores from '../components/tablaJugadores';
/* import Oxox from '../components/oxox.tablero'; 
 */import JuegoAdivinanza from '../components/adivina.tablero';
import "./css/game.css"


function PaginaJuego() {
  return (
    <div style={{ display: 'flex' }}>
      <div className='top-jugadores'>
        <Jugadores />
      </div>
      <div className='game'>
{/*         <Oxox />
 */}      
 <JuegoAdivinanza/>
 </div>
    </div>
  );
}

export default PaginaJuego;
