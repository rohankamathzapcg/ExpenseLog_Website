import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  // Fetch Userdata from session Storage if already available otherwise save null
  const [authUser, setAuthUser] = useState(JSON.parse(window.sessionStorage.getItem('authUser')));
  const x = window.sessionStorage.getItem('isLoggedIn') === 'true' ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(x);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }

  // const login = (newData) => {
  //   window.sessionStorage.setItem(
  //     "UserData",
  //     JSON.stringify({ user: newData })
  //   );
  //   setAuthUser(newData);
  //   setIsLoggedIn(true);
  // };

  // const logout = () => {
  //   window.sessionStorage.removeItem("UserData");
  //   setAuthUser(null);
  //   setIsLoggedIn(false);
  // };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}