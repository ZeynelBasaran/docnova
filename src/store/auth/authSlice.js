import { createSlice } from '@reduxjs/toolkit';




// httpOnly cookie kullanımı için localStorage'dan sadece user bilgisini yükle
// Token artık httpOnly cookie'de saklanıyor
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      // user objesi içinde jwt bilgisi de olmalı (backend'den gelen response'a göre)
      // httpOnly cookie backend tarafından set edilecek
      const userWithJwt = {
        ...action.payload.user,
        jwt: action.payload.jwt, // jwt'yi user objesine ekle
      };
      state.user = userWithJwt;
      state.error = null;

      // Sadece user bilgisini localStorage'a kaydet (token httpOnly cookie'de)
      localStorage.setItem("user", JSON.stringify(userWithJwt));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
      // httpOnly cookie backend tarafından temizlenecek (logout endpoint'i gerekebilir)
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;