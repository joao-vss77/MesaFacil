export default function EmptyState({ titulo, descricao }) {
  return (
    <div className="px-3 py-[50px] text-center text-sm text-ink-muted">
      <p className="mb-2 font-serif text-[22px] text-ink-soft">{titulo}</p>
      {descricao && <p>{descricao}</p>}
    </div>
  );
}
