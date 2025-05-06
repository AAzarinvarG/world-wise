import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

function Button({ children, btnTheme }) {
  const navigate = useNavigate();

  return (
    <button
      className={styles.btn}
      style={{ border: `1px solid ${btnTheme}`, color: `${btnTheme}` }}
      onClick={() => navigate(-1)}
    >
      ⬅️{children}
    </button>
  );
}

export default Button;
