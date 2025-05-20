import React from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const userInfo = {
    name: "roni",
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
