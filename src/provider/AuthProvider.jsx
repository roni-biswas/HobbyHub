import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = {
    user,
    loading,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
