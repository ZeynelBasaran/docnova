import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/auth/authSlice';
import { postData } from '../api';
import { useNavigate } from 'react-router-dom';

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (credentials) => {
    dispatch(loginStart());
    try {
      const response = await postData("/auth/login/dev", credentials);
      
      const { user, jwt } = response;

      localStorage.setItem('user', user);
      localStorage.setItem('token', jwt);
      
      
      dispatch(loginSuccess({ user, jwt }));
      navigate('/invoices');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  return { loginUser, logoutUser };
};

export default useAuthActions;
