// az (NavLink) ham mitonim estefade konim be ja (Link)
// farqesh ine ke vaqti az (NavLink) estefade mikonim (url) site ba har kodom az (to) haye (NavLink) yeki bashe on (NavLink) ye class "active" migire.
import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing"> Pricing </NavLink>
        </li>
        <li>
          <NavLink to="/product"> Product </NavLink>
        </li>
        <li>
          <Link to="/login" className={styles.loginBtn}>
            log in
          </Link> 
        </li>
      </ul>
    </nav>
  );
}
