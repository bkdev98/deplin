import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../utils/useAuth";

function RequireAuth({ children }: { children: JSX.Element }) {
    let {zeplinAccessToken} = useAuth();
    let location = useLocation();
  
    if (!zeplinAccessToken) {
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth;
