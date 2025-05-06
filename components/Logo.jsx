import { Link } from "react-router-dom";
import style from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img className={style.logo} src="/logo.png" alt="world wise logo" />
    </Link>
  );
}

export default Logo;
