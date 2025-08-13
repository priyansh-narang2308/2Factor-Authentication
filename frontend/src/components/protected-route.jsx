import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/session-context";

const ProtectedRoute = () => {
  const { isLoggedIn,loading } = useSession();

  if(loading){
    return <div>Loading...</div>
  }

  return <div>{isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default ProtectedRoute;
