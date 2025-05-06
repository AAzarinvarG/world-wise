import { Outlet } from "react-router-dom";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

export default function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.parentLogoAppNavOutlet}>
        <Logo />
        <AppNav />
        <Outlet />
      </div>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
