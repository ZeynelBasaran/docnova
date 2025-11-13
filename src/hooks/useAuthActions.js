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
      // Login isteği - httpOnly cookie backend tarafından set edilecek
      // withCredentials: true ile cookie otomatik gönderilir ve alınır
      const response = await postData("/auth/login/dev", credentials);
      
      // Backend'den gelen response'da user ve jwt bilgisi olmalı
      const { user, jwt } = response;

      // user ve jwt'yi Redux'a kaydet (jwt user.jwt olarak saklanacak)
      // httpOnly cookie backend tarafından set edildi, localStorage'a token kaydetmiyoruz
      dispatch(loginSuccess({ user, jwt }));
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));

      return { success: false, error: errorMessage };
    }
  };

  const logoutUser = async () => {
    // Logout işlemi - httpOnly cookie backend tarafından temizlenecek
    // Eğer backend'de logout endpoint'i varsa, oraya istek atılabilir
    // Şimdilik sadece frontend state'ini temizle
    dispatch(logout());
    const currentPath = window.location.pathname;
    const lang = currentPath.split('/')[1] || 'en';
    navigate(`/${lang}`);
  };

  return { loginUser, logoutUser };
};

export default useAuthActions;