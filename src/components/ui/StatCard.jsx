export default function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <p className="mb-[10px] text-[11px] uppercase tracking-[.2em] text-ink-muted">{label}</p>
      <p className="font-serif text-[32px] leading-none">{value}</p>
    </article>
  );
}
