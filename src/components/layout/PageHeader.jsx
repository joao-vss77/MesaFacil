export default function PageHeader({ titulo, descricao, acoes }) {
  return (
    <div className="mb-[30px] flex flex-wrap items-end justify-between gap-5 border-b border-line pb-5">
      <div>
        <h2 className="text-[40px]">{titulo}</h2>
        {descricao && <p className="mt-[6px] text-[13px] text-ink-soft">{descricao}</p>}
      </div>
      {acoes && <div className="flex gap-3">{acoes}</div>}
    </div>
  );
}
