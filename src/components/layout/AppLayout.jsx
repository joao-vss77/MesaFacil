import { Outlet } from 'react-router-dom';
import BackgroundLines from './BackgroundLines.jsx';
import Topbar from './Topbar.jsx';
import NavTabs from './NavTabs.jsx';

/** Casca da área autenticada: topo fixo, abas e área de conteúdo. */
export default function AppLayout() {
  return (
    <div className="min-h-full">
      <BackgroundLines />
      <Topbar />
      <NavTabs />
      <main className="relative z-10 mx-auto w-full max-w-[1280px] animate-fade px-10 pb-[70px] pt-11 max-lg:px-5">
        <Outlet />
      </main>
    </div>
  );
}
