import { useEffect } from 'react';

/** Modal centralizado — fecha no clique do fundo ou na tecla Esc. */
export default function Modal({ titulo, subtitulo, onClose, acoes, children }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-5 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="max-h-[92vh] w-full max-w-[480px] animate-pop overflow-y-auto border border-line bg-cream p-[38px]"
      >
        <h3 className="mb-[6px] text-[30px]">{titulo}</h3>
        {subtitulo && <p className="mb-6 text-[13px] text-ink-soft">{subtitulo}</p>}
        {children}
        {acoes && <div className="mt-[26px] flex gap-3 [&>button]:w-full">{acoes}</div>}
      </div>
    </div>
  );
}
