import styles from "./FakeUser.module.css";
import { ContextFunc } from "../context/fakeAuthContext";
import { useNavigate } from "react-router-dom";

const FAKE_USER = {
  name: "Abolfazl",
  email: "azarinvare@gmail.com",
  password: 12345678,
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function FakeUser() {
  const nav = useNavigate();
  const { dispatch } = ContextFunc();
  const user = JSON.parse(localStorage.getItem("userInfo")) || FAKE_USER;

  function clickHandler() {
    dispatch({ type: "logout" });
    localStorage.clear();
    nav("/");
  }

  return (
    <div className={styles.userInfoSection}>
      <img src={user.avatar} alt="" />
      <h4> Welcome, {user.name} </h4>
      <button onClick={clickHandler}> LOGOUT </button>
    </div>
  );
}

export { FakeUser, FAKE_USER };
