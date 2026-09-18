import { Link } from 'react-router-dom';
import BackgroundLines from '../components/layout/BackgroundLines.jsx';

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-4 text-center">
      <BackgroundLines />
      <p className="relative z-10 font-serif text-[64px] leading-none">404</p>
      <p className="relative z-10 text-sm text-ink-soft">A página que você procura não existe.</p>
      <Link to="/" className="relative z-10 btn-ghost btn-sm">
        Voltar ao salão
      </Link>
    </div>
  );
}
