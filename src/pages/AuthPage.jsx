import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackgroundLines from '../components/layout/BackgroundLines.jsx';
import BrandPanel from '../components/auth/BrandPanel.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { IconShield } from '../components/ui/Icons.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';

/** Tela de acesso: alterna entre login (RF01) e cadastro (RF02 / RF03). */
export default function AuthPage() {
  const [modo, setModo] = useState('login');
  const { entrar, cadastrar } = useAuth();
  const { notificar } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const destino = location.state?.from?.pathname ?? '/';

  const handleLogin = (form) => {
    const resultado = entrar(form);
    if (resultado.ok) {
      notificar(`Bem-vindo, ${resultado.usuario.nome.split(' ')[0]}!`);
      navigate(destino, { replace: true });
    }
    return resultado;
  };

  const handleCadastro = (form) => {
    const resultado = cadastrar(form);
    if (resultado.ok) {
      notificar('Cadastro realizado com sucesso.');
      navigate('/', { replace: true });
    }
    return resultado;
  };

  return (
    <div className="relative grid min-h-full grid-cols-[1fr_620px] max-lg:grid-cols-1">
      <BackgroundLines />

      <div className="relative z-10">
        <BrandPanel />
      </div>

      <div className="relative z-10 flex max-h-screen flex-col justify-center overflow-y-auto bg-cream px-14 py-12 shadow-panel max-lg:max-h-none max-lg:px-[8vw] max-lg:pb-[60px]">
        <div className="mb-[34px] flex items-center justify-between border-b border-line pb-5">
          <span className="eyebrow">Acesso ao sistema</span>
          <IconShield className="text-ink-muted" />
        </div>

        {modo === 'login' ? (
          <LoginForm onSubmit={handleLogin} onTrocarModo={() => setModo('cadastro')} />
        ) : (
          <RegisterForm onSubmit={handleCadastro} onTrocarModo={() => setModo('login')} />
        )}
      </div>
    </div>
  );
}
