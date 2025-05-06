import PageNav from "../../components/PageNav";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
// import { ContextFunc } from "../../context/fakeAuthContext";

export default function HomePage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className={styles.homePage}>
      <PageNav />

      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        {!userInfo ? (
          <button className={`${styles.startBtn}`} disabled>
            To use the site, register first
          </button>
        ) : (
          <Link to="app">
            <button className={`${styles.startBtn}`}>Start tracking now</button>
          </Link>
        )}
      </section>
    </div>
  );
}
