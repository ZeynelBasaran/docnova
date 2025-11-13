import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import invoiceReducer from './invoice/invoiceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/loginSuccess'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user'],
      },
    }),
});

export default store;
