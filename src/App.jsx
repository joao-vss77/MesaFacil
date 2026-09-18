import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import RequireAuth from './components/auth/RequireAuth.jsx';
import AuthPage from './pages/AuthPage.jsx';
import MesasPage from './pages/MesasPage.jsx';
import ComandaPage from './pages/ComandaPage.jsx';
import ComandasAbertasPage from './pages/ComandasAbertasPage.jsx';
import HistoricoPage from './pages/HistoricoPage.jsx';
import ConfiguracoesPage from './pages/ConfiguracoesPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

/** Mapa de rotas da aplicação (RF01 a RF11). */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<MesasPage />} />
        <Route path="/comandas" element={<ComandasAbertasPage />} />
        <Route path="/comandas/:numeroMesa" element={<ComandaPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/configuracoes" element={<ConfiguracoesPage />} />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
