import style from './javi.module.css'
import { FaGoogle } from "react-icons/fa";

export default function javiPage() {
  return (
    <div className={style.containerPage}>
        <div className={style.Logo}>
            <img src="" alt="" />
        </div>
        <form action="">
            <input type="email" />
            <input type="password" />
        </form>
        <button>
            Iniciar Sesion
        </button>
        <hr />
       <input type="button" value="" >
       {/* <FaGoogle size={50}/> */}
        </input>

    </div>
  )
}
