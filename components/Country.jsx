import styles from "./Country.module.css";

export default function Country({ item }) {
  return (
    <li className={styles.country}>
      <h3> {item.country} </h3>
    </li>
  );
}
