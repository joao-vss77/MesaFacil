import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export default function Topbar() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  const handleSair = () => {
    sair();
    navigate('/login', { replace: true });
  };

  return (
    <header className="relative z-10 flex items-center justify-between bg-ink px-10 py-[18px] text-cream max-lg:px-5">
      <div className="flex items-center gap-4">
        <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-cream font-serif text-sm text-ink">
          MF
        </span>
        <span className="font-serif text-xl tracking-wide">Mesa Fácil</span>
      </div>

      <div className="flex items-center gap-[18px] text-xs uppercase tracking-[.14em] opacity-85">
        <span>{usuario?.nome}</span>
        <button
          type="button"
          onClick={handleSair}
          className="border border-cream/30 px-[14px] py-[7px] text-[11px] uppercase tracking-[.14em] transition hover:bg-cream/10"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
