import { useCallback, useMemo } from 'react';
import { useStore } from './useStore.js';
import { supabase } from '../lib/supabase.js';
import { checar } from '../lib/checar.js';

/** Histórico de vendas e indicadores derivados (RF11). */
export function useHistorico() {
  const { db, setDb, gravar } = useStore();
  const { historico } = db;

  const resumo = useMemo(() => {
    const faturamento = historico.reduce((soma, v) => soma + v.total, 0);
    return {
      quantidade: historico.length,
      faturamento,
      ticketMedio: historico.length ? faturamento / historico.length : 0,
    };
  }, [historico]);

  const limpar = useCallback(() => {
    setDb((atual) => ({ ...atual, historico: [] }));
    gravar(async () => checar(await supabase.from('vendas').delete().neq('id', -1)));
  }, [setDb, gravar]);

  return { historico, resumo, limpar };
}