export default function Card({ title, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {title && (
        <header className="mb-[18px]">
          <span className="pill">{title}</span>
        </header>
      )}
      {children}
    </section>
  );
}
