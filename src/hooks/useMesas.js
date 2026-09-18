import { useCallback, useMemo } from 'react';
import { useStore } from './useStore.js';
import { calcularTotal } from '../utils/comanda.js';
import { horaAtual } from '../utils/format.js';

/** Regras de mesas e comandas (RF07 a RF09, RF11). */
export function useMesas() {
  const { db, setDb } = useStore();
  const { mesas, historico } = db;

  const buscarMesa = useCallback(
    (numero) => mesas.find((m) => m.numero === Number(numero)) ?? null,
    [mesas],
  );

  const mesasLivres = useMemo(() => mesas.filter((m) => m.status === 'livre'), [mesas]);
  const comandasAbertas = useMemo(() => mesas.filter((m) => m.status === 'ocupada'), [mesas]);

  const indicadores = useMemo(
    () => ({
      livres: mesasLivres.length,
      ocupadas: comandasAbertas.length,
      comandasAbertas: comandasAbertas.length,
      vendasDoDia: historico.reduce((soma, venda) => soma + venda.total, 0),
    }),
    [mesasLivres, comandasAbertas, historico],
  );

  const alterarMesa = useCallback(
    (numero, patch) =>
      setDb((atual) => ({
        ...atual,
        mesas: atual.mesas.map((m) =>
          m.numero === Number(numero) ? { ...m, ...(typeof patch === 'function' ? patch(m) : patch) } : m,
        ),
      })),
    [setDb],
  );

  /** Abertura de comanda: ocupa a mesa e zera os itens. */
  const abrirComanda = useCallback(
    (numero, cliente = '') =>
      alterarMesa(numero, { status: 'ocupada', cliente: cliente.trim(), itens: [], abertaEm: horaAtual() }),
    [alterarMesa],
  );

  const adicionarItem = useCallback(
    (numero, produto, quantidade) =>
      alterarMesa(numero, (mesa) => {
        const existente = mesa.itens.find((i) => i.codigo === produto.codigo);
        const itens = existente
          ? mesa.itens.map((i) =>
              i.codigo === produto.codigo ? { ...i, quantidade: i.quantidade + quantidade } : i,
            )
          : [...mesa.itens, { ...produto, quantidade }];
        return { itens };
      }),
    [alterarMesa],
  );

  const alterarQuantidade = useCallback(
    (numero, codigo, delta) =>
      alterarMesa(numero, (mesa) => ({
        itens: mesa.itens.map((i) =>
          i.codigo === codigo ? { ...i, quantidade: Math.max(1, i.quantidade + delta) } : i,
        ),
      })),
    [alterarMesa],
  );

  const removerItem = useCallback(
    (numero, codigo) =>
      alterarMesa(numero, (mesa) => ({ itens: mesa.itens.filter((i) => i.codigo !== codigo) })),
    [alterarMesa],
  );

  /** Fechamento: grava no histórico e libera a mesa. */
  const fecharComanda = useCallback(
    (numero) =>
      setDb((atual) => {
        const mesa = atual.mesas.find((m) => m.numero === Number(numero));
        if (!mesa) return atual;
        const venda = {
          id: Date.now(),
          mesa: mesa.numero,
          cliente: mesa.cliente,
          itens: mesa.itens,
          total: calcularTotal(mesa.itens),
          hora: horaAtual(),
          data: new Date().toLocaleDateString('pt-BR'),
        };
        return {
          ...atual,
          historico: [venda, ...atual.historico],
          mesas: atual.mesas.map((m) =>
            m.numero === mesa.numero
              ? { ...m, status: 'livre', cliente: '', itens: [], abertaEm: null }
              : m,
          ),
        };
      }),
    [setDb],
  );

  return {
    mesas,
    mesasLivres,
    comandasAbertas,
    indicadores,
    buscarMesa,
    abrirComanda,
    adicionarItem,
    alterarQuantidade,
    removerItem,
    fecharComanda,
  };
}
