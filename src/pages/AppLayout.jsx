import styles from "./AppLayout.module.css";
import SideBar from "../../components/SideBar";
import Map from "../../components/Map";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AppLayout() {
  const nav = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo"))) return nav("/");
  }, []);

  return (
    <div className={styles.appLayout}>
      <SideBar />
      <Map />
    </div>
  );
}
