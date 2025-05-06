import styles from "./Message.module.css";

export default function Message({ children }) {
  return <h2 className={styles.message}> {children} </h2>;
}
