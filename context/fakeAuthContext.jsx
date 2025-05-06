import { useReducer, createContext, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        user: null,
      };
  }
}

function AuthProvider({ children }) {
  const [{ user }, dispatch] = useReducer(reducer, initialState);

  user && localStorage.setItem("userInfo", JSON.stringify(user));

  return (
    <AuthContext.Provider value={{ dispatch }}>{children}</AuthContext.Provider>
  );
}

function ContextFunc() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("You did not create such a context ❗️");

  return context;
}

export { AuthProvider, ContextFunc };
