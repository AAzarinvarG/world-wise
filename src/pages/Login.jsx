import { useRef } from "react";
import PageNav from "../../components/PageNav";
import styles from "./Login.module.css";
import { ContextFunc } from "../../context/fakeAuthContext";
import { FAKE_USER } from "../../components/FakeUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const { dispatch } = ContextFunc();
  const nav = useNavigate();

  const emailInput = useRef();
  const passwordInput = useRef();

  function clickHandler() {
    const EmailAndPassword = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    if (
      FAKE_USER.email === EmailAndPassword.email &&
      FAKE_USER.password === Number(EmailAndPassword.password)
    ) {
      dispatch({ type: "login", payload: FAKE_USER });
      EmailAndPassword.email = "";
      EmailAndPassword.password = "";
      nav("/");
    } else {
      alert("Password Or Email Not Valid.");
    }
  }

  return (
    <div className={styles.login}>
      <PageNav />

      <section>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            ref={emailInput}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="..............."
            ref={passwordInput}
          />

          <button onClick={clickHandler}> Login </button>
        </div>
      </section>
    </div>
  );
}

export default Login;
