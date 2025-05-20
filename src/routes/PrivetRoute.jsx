import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";

const PrivetRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }
  return children;
};

export default PrivetRoute;
