import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { lng } = useParams();

  
  if (!isAuthenticated) {
    const lang = (lng || 'en').split('-')[0];
    return <Navigate to={`/${lang}`} replace />;
  }

  return <Outlet />;
};
