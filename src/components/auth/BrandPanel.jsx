/** Lado esquerdo da tela de acesso — identidade visual do produto. */
export default function BrandPanel() {
  return (
    <div className="flex flex-col justify-center px-[7vw] max-lg:px-[8vw] max-lg:pb-5 max-lg:pt-[60px]">
      <div className="mb-[34px] flex items-center gap-[26px]">
        <span className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full bg-ink font-serif text-[30px] tracking-tight text-cream">
          MF
        </span>
        <div>
          <p className="mb-[6px] text-[11px] uppercase tracking-ultra text-ink-soft">N2APP</p>
          <h1 className="font-serif text-[clamp(46px,6vw,82px)] font-medium leading-[.92] tracking-tight">
            MESA
            <br />
            FÁCIL
          </h1>
        </div>
      </div>

      <p className="mb-7 max-w-[420px] font-serif text-[26px] leading-snug">
        Mesas, comandas e vendas em um fluxo leve.
      </p>
      <p className="text-[11px] font-medium uppercase tracking-widest2 text-ink-soft">
        Controle simples • Serviço presente
      </p>
    </div>
  );
}
