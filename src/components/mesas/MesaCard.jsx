import Badge from '../ui/Badge.jsx';
import { formatarMoeda, pad2 } from '../../utils/format.js';
import { calcularTotal } from '../../utils/comanda.js';

/** Cartão de mesa do salão — clicar abre ou continua a comanda (RF07 / RF08). */
export default function MesaCard({ mesa, onSelecionar }) {
  const ocupada = mesa.status === 'ocupada';

  return (
    <button
      type="button"
      onClick={() => onSelecionar(mesa)}
      className="relative border border-line bg-cream p-6 text-left transition hover:-translate-y-[3px] hover:border-ink hover:shadow-lift"
    >
      <Badge status={mesa.status} className="absolute right-[18px] top-[18px]" />
      <p className="mb-1 font-serif text-[30px]">Mesa {pad2(mesa.numero)}</p>
      <p className="min-h-[18px] text-xs text-ink-soft">
        {mesa.cliente || (ocupada ? 'Sem nome' : 'Disponível')}
      </p>
      <p className="mt-[14px] font-serif text-[19px]">
        {ocupada ? formatarMoeda(calcularTotal(mesa.itens)) : '—'}
      </p>
    </button>
  );
}
