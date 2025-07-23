import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isAuthenticated = !!auth?.token;

  return isAuthenticated ? children : <Navigate to="/connexion" replace />;
};

export default PrivateRoute;
