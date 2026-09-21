import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../hooks/useAuth.js';
import { criarEstadoInicial } from '../constants/seed.js';

export const StoreContext = createContext(null);

const agrupar = (linhas, chave) =>
  linhas.reduce((mapa, l) => {
    (mapa[l[chave]] ??= []).push({
      codigo: l.codigo,
      nome: l.nome,
      preco: Number(l.preco),
      quantidade: l.quantidade,
    });
    return mapa;
  }, {});

async function semear() {
  const ini = criarEstadoInicial();
  await supabase.from('produtos').upsert(ini.produtos, { onConflict: 'codigo' });
  await supabase
    .from('mesas')
    .upsert(
      ini.mesas.map((m) => ({ numero: m.numero, status: 'livre', cliente: '', aberta_em: null })),
      { onConflict: 'numero' },
    );
}

async function carregarTudo() {
  const respostas = await Promise.all([
    supabase.from('produtos').select('*').order('ordem'),
    supabase.from('mesas').select('*').order('numero'),
    supabase.from('itens_mesa').select('*').order('id'),
    supabase.from('vendas').select('*').order('id', { ascending: false }),
    supabase.from('itens_venda').select('*').order('id'),
  ]);
  const erro = respostas.find((r) => r.error)?.error;
  if (erro) throw erro;
  const [p, m, im, v, iv] = respostas.map((r) => r.data);

  const itensPorMesa = agrupar(im, 'mesa_numero');
  const itensPorVenda = agrupar(iv, 'venda_id');

  return {
    produtos: p.map((x) => ({ codigo: x.codigo, nome: x.nome, preco: Number(x.preco) })),
    mesas: m.map((x) => ({
      numero: x.numero,
      status: x.status,
      cliente: x.cliente ?? '',
      abertaEm: x.aberta_em ?? null,
      itens: itensPorMesa[x.numero] ?? [],
    })),
    historico: v.map((x) => ({
      id: x.id,
      mesa: x.mesa,
      cliente: x.cliente ?? '',
      total: Number(x.total),
      hora: x.hora,
      data: x.data,
      itens: itensPorVenda[x.id] ?? [],
    })),
  };
}

export function StoreProvider({ children }) {
  const { autenticado } = useAuth();
  const [db, setDb] = useState(criarEstadoInicial);
  const [pronto, setPronto] = useState(false);

  const recarregar = useCallback(async () => {
    let dados = await carregarTudo();
    if (dados.mesas.length === 0) {
      await semear();
      dados = await carregarTudo();
    }
    setDb(dados);
  }, []);

  useEffect(() => {
    if (!autenticado) {
      setPronto(false);
      return undefined;
    }
    let cancelado = false;
    recarregar()
      .catch((e) => console.error('Erro ao carregar dados:', e))
      .finally(() => !cancelado && setPronto(true));
    return () => {
      cancelado = true;
    };
  }, [autenticado, recarregar]);

  /** Executa gravações no banco; se algo falhar, recarrega o estado real. */
  const gravar = useCallback(
    async (fn) => {
      try {
        await fn();
      } catch (e) {
        console.error('Erro ao gravar:', e);
        await recarregar().catch(() => {});
      }
    },
    [recarregar],
  );

  const resetar = useCallback(async () => {
    await supabase.from('vendas').delete().neq('id', -1);
    await supabase.from('mesas').delete().neq('numero', -1);
    await supabase.from('produtos').delete().neq('codigo', '');
    await recarregar();
  }, [recarregar]);

  const atualizar = useCallback((patchFn) => setDb((atual) => ({ ...atual, ...patchFn(atual) })), []);
  const setSessao = useCallback(() => {}, []);

  const value = useMemo(
    () => ({ db, setDb, atualizar, sessao: null, setSessao, resetar, recarregar, gravar }),
    [db, atualizar, setSessao, resetar, recarregar, gravar],
  );

  if (autenticado && !pronto) return null;
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}