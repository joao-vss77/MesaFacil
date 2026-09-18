import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore deve ser usado dentro de <StoreProvider>.');
  return ctx;
}
