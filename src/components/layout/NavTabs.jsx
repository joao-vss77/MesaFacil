import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation.js';

export default function NavTabs() {
  return (
    <nav className="relative z-10 flex gap-[2px] overflow-x-auto bg-sage-deep px-10 max-lg:px-5">
      {NAV_ITEMS.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            [
              'whitespace-nowrap border-b-2 px-[26px] py-4 text-xs uppercase tracking-[.18em] transition',
              isActive
                ? 'border-ink bg-cream text-ink'
                : 'border-transparent text-ink-soft hover:text-ink',
            ].join(' ')
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
