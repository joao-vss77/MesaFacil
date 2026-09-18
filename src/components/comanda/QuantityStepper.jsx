export default function QuantityStepper({ quantidade, onAlterar }) {
  return (
    <span className="inline-flex items-center border border-line bg-cream-soft">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => onAlterar(-1)}
        className="h-[30px] w-[30px] text-[15px] text-ink-soft transition hover:text-ink"
      >
        −
      </button>
      <span className="min-w-[30px] text-center text-[13px]">{quantidade}</span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onAlterar(1)}
        className="h-[30px] w-[30px] text-[15px] text-ink-soft transition hover:text-ink"
      >
        +
      </button>
    </span>
  );
}
