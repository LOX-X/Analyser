import { Link } from "react-router-dom";
import style from './navstyle.module.css';

function NavBar() {
  return (
    <nav className={`${style.navbar}`}>
        <Link to='/' className={`${style.link}`}>
          <img className={`${style.img}`} src="/assets/any.svg" alt="any" />
          <p className={`${style.text}`}>Analyser</p>
        </Link>
        <Link className={`${style.link}`} to='/translator'>
          <img className={`${style.img}`} src="/assets/music.svg" alt="any" />
          <p className={`${style.text}`}>MorseCode</p>
        </Link>
    </nav>
  )
}

export default NavBar;