import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProtectedRoute } from './components/ProtectedRoute';
import InvoicesPage from './pages/invoices/InvoicesPage';
import MainLayout from './layouts/MainLayout';
import LoginPage from "./pages/login-page/LoginPage";
import Details from './pages/details/Details';


// Sync i18n language with URL param and validate supported langs
const SupportedLangs = ['en', 'tr'];

const LocaleSync = ({ children }) => {
  const { lng } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const shortLng = (lng || '').split('-')[0];
    const current = i18n.language.split('-')[0];
    if (!SupportedLangs.includes(shortLng)) {
      // If invalid lang in URL, redirect to current language
      // Navigation is handled in Routes via Navigate
      return;
    }
    if (shortLng && shortLng !== current) {
      i18n.changeLanguage(shortLng);
    }
  }, [lng, i18n, location.pathname]);

  return children;
};

function App() {
  const { i18n } = useTranslation();
  const detected = i18n.language?.split('-')[0] || 'en';
  const initialLang = SupportedLangs.includes(detected) ? detected : 'en';

  return (
    <Routes>
      {/* Redirect root to detected language */}
      <Route path="/" element={<Navigate to={`/${initialLang}`} replace />} />

      {/* All routes under language prefix */}
      <Route path=":lng" element={<MainLayout />}>
        <Route
          index
          element={
            <LocaleSync>
              <LoginPage />
            </LocaleSync>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route>
            <Route
              path="invoices"
              element={
                <LocaleSync>
                  <InvoicesPage />
                </LocaleSync>
              }
            />
            <Route
              path="invoices/:details"
              element={
                <LocaleSync>
                  <Details />
                </LocaleSync>
              }
            />
          </Route>
        </Route>

        {/* 404 redirect within language scope */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>

      {/* Catch-all to root redirect */}
      <Route path="*" element={<Navigate to={`/${initialLang}`} replace />} />
    </Routes>
  );
}

export default App;
