import { formatarMoeda } from '../../utils/format.js';

export default function TotalBar({ rotulo = 'Total da comanda', valor, acao }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-[22px]">
      <p className="text-[11px] uppercase tracking-[.2em] text-ink-muted">{rotulo}</p>
      <div className="flex items-center gap-[26px]">
        <p className="font-serif text-[38px] leading-none">{formatarMoeda(valor)}</p>
        {acao}
      </div>
    </div>
  );
}
