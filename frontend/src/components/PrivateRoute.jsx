import { Navigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  const auth = useAuth();
  console.log(auth);
  return auth ? <>{Component}</> : <Navigate to="/signin" />;
};
export default PrivateRoute;
