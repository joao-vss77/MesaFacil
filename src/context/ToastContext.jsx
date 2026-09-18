import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import Toast from '../components/ui/Toast.jsx';

export const ToastContext = createContext(null);

/** Disponibiliza a função notificar() em toda a aplicação. */
export function ToastProvider({ children }) {
  const [mensagem, setMensagem] = useState('');
  const timer = useRef(null);

  const notificar = useCallback((texto) => {
    setMensagem(texto);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMensagem(''), 2600);
  }, []);

  const value = useMemo(() => ({ notificar }), [notificar]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast mensagem={mensagem} />
    </ToastContext.Provider>
  );
}
