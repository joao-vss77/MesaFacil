const ESTILOS = {
  livre: 'bg-ok/15 text-ok',
  ocupada: 'bg-danger/15 text-danger',
  neutro: 'bg-sage-deep text-ink-soft',
};

export default function Badge({ status = 'neutro', children, className = '' }) {
  return (
    <span
      className={`inline-block rounded-sm px-[10px] py-[5px] text-[10px] uppercase tracking-[.16em] ${
        ESTILOS[status] ?? ESTILOS.neutro
      } ${className}`}
    >
      {children ?? status}
    </span>
  );
}
