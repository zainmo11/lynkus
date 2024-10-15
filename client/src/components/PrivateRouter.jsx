/* eslint-disable react/prop-types */
import { isAuthorized } from "../utils/checkAuth";
import { Navigate } from "react-router-dom";

function PrivateRouter({ children }) {
  const isAuth = isAuthorized();
  return isAuth ? children : <Navigate to="/welcome" />;
}

export default PrivateRouter;
