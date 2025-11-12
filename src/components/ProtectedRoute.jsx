import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);


  console.log(isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
