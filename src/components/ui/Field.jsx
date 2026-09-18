/**
 * Campo de formulário com rótulo, ícone opcional, ação à direita e mensagem de erro.
 */
export default function Field({ label, hint, error, icon, action, htmlFor, children, className = '' }) {
  return (
    <div className={`relative mb-[18px] ${className}`}>
      {label && (
        <label className="label" htmlFor={htmlFor}>
          {label} {hint && <span className="font-normal text-ink-muted">{hint}</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">
            {icon}
          </span>
        )}
        {children}
        {action && <div className="absolute right-3 top-1/2 -translate-y-1/2">{action}</div>}
      </div>

      {error && <p className="mt-[6px] text-xs text-danger">{error}</p>}
    </div>
  );
}
