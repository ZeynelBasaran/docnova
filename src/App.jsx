import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import InvoicesLayout from './layouts/InvoicesLayout';
import InvoicesPage from './pages/invoices/InvoicesPage';
import MainLayout from './layouts/MainLayout';
import LoginPage from "./pages/login-page/LoginPage"


function App() {
  return (
    <Routes>
      {/* Tüm sayfalar MainLayout içinde */}
      <Route element={<MainLayout />}>
        
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<InvoicesLayout />}>
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/invoices/:details" element={<InvoicesPage />} />
          </Route>
        </Route>

        {/* 404 veya yönlendirme */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
