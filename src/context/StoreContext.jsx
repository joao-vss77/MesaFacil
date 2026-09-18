import { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { criarEstadoInicial } from '../constants/seed.js';
import { STORAGE_KEYS } from '../constants/storage.js';

export const StoreContext = createContext(null);

/**
 * Fonte única de verdade da aplicação.
 * Todo o estado é persistido em localStorage (NRF01 / NRF11).
 */
export function StoreProvider({ children }) {
  const [db, setDb] = useLocalStorage(STORAGE_KEYS.DB, criarEstadoInicial);
  const [sessao, setSessao] = useLocalStorage(STORAGE_KEYS.SESSION, null);

  const atualizar = useCallback((patchFn) => setDb((atual) => ({ ...atual, ...patchFn(atual) })), [setDb]);

  const resetar = useCallback(() => {
    setDb(criarEstadoInicial());
    setSessao(null);
  }, [setDb, setSessao]);

  const value = useMemo(
    () => ({ db, setDb, atualizar, sessao, setSessao, resetar }),
    [db, setDb, atualizar, sessao, setSessao, resetar],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
