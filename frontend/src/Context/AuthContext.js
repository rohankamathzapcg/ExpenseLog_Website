import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (newData) => {
    window.sessionStorage.setItem(
      "UserData",
      JSON.stringify({ user: newData })
    );
    setAuthUser(newData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    window.sessionStorage.removeItem("UserData");
    setAuthUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ authUser, isLoggedIn, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
