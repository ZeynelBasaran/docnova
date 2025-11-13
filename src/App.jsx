import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import InvoicesPage from './pages/invoices/InvoicesPage';
import MainLayout from './layouts/MainLayout';
import LoginPage from "./pages/login-page/LoginPage"
import Details from './pages/details/Details';


function App() {
  return (
    <Routes>
      {/* Tüm sayfalar MainLayout içinde */}
      <Route element={<MainLayout />}>
        
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route >
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/invoices/:details" element={<Details />} />
          </Route>
        </Route>

        {/* 404 veya yönlendirme */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
