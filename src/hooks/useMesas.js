import { useCallback, useMemo } from 'react';
import { useStore } from './useStore.js';
import { supabase } from '../lib/supabase.js';
import { checar } from '../lib/checar.js';
import { calcularTotal } from '../utils/comanda.js';
import { horaAtual } from '../utils/format.js';

/** Regras de mesas e comandas (RF07 a RF09, RF11), gravadas no Supabase. */
export function useMesas() {
  const { db, setDb, gravar } = useStore();
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

  /** Atualiza só o estado local (a gravação no banco é feita por cada ação). */
  const alterarLocal = useCallback(
    (numero, patch) =>
      setDb((atual) => ({
        ...atual,
        mesas: atual.mesas.map((m) =>
          m.numero === Number(numero) ? { ...m, ...(typeof patch === 'function' ? patch(m) : patch) } : m,
        ),
      })),
    [setDb],
  );

  const abrirComanda = useCallback(
    (numero, cliente = '') => {
      const n = Number(numero);
      const nome = cliente.trim();
      const hora = horaAtual();
      alterarLocal(n, { status: 'ocupada', cliente: nome, itens: [], abertaEm: hora });
      gravar(async () => {
        checar(await supabase.from('itens_mesa').delete().eq('mesa_numero', n));
        checar(
          await supabase
            .from('mesas')
            .update({ status: 'ocupada', cliente: nome, aberta_em: hora })
            .eq('numero', n),
        );
      });
    },
    [alterarLocal, gravar],
  );

  const adicionarItem = useCallback(
    (numero, produto, quantidade) => {
      const n = Number(numero);
      const mesa = mesas.find((m) => m.numero === n);
      if (!mesa) return;
      const existente = mesa.itens.find((i) => i.codigo === produto.codigo);
      const novaQtd = (existente?.quantidade ?? 0) + quantidade;

      alterarLocal(n, (m) => ({
        itens: existente
          ? m.itens.map((i) => (i.codigo === produto.codigo ? { ...i, quantidade: novaQtd } : i))
          : [...m.itens, { ...produto, quantidade }],
      }));

      gravar(async () =>
        checar(
          await supabase.from('itens_mesa').upsert(
            {
              mesa_numero: n,
              codigo: produto.codigo,
              nome: produto.nome,
              preco: produto.preco,
              quantidade: novaQtd,
            },
            { onConflict: 'mesa_numero,codigo' },
          ),
        ),
      );
    },
    [mesas, alterarLocal, gravar],
  );

  const alterarQuantidade = useCallback(
    (numero, codigo, delta) => {
      const n = Number(numero);
      const item = mesas.find((m) => m.numero === n)?.itens.find((i) => i.codigo === codigo);
      if (!item) return;
      const novaQtd = Math.max(1, item.quantidade + delta);

      alterarLocal(n, (m) => ({
        itens: m.itens.map((i) => (i.codigo === codigo ? { ...i, quantidade: novaQtd } : i)),
      }));

      gravar(async () =>
        checar(
          await supabase
            .from('itens_mesa')
            .update({ quantidade: novaQtd })
            .eq('mesa_numero', n)
            .eq('codigo', codigo),
        ),
      );
    },
    [mesas, alterarLocal, gravar],
  );

  const removerItem = useCallback(
    (numero, codigo) => {
      const n = Number(numero);
      alterarLocal(n, (m) => ({ itens: m.itens.filter((i) => i.codigo !== codigo) }));
      gravar(async () =>
        checar(await supabase.from('itens_mesa').delete().eq('mesa_numero', n).eq('codigo', codigo)),
      );
    },
    [alterarLocal, gravar],
  );

  /** Fechamento: grava no histórico e libera a mesa. */
  const fecharComanda = useCallback(
    (numero) => {
      const n = Number(numero);
      const mesa = mesas.find((m) => m.numero === n);
      if (!mesa) return;

      const venda = {
        id: Date.now(),
        mesa: mesa.numero,
        cliente: mesa.cliente,
        itens: mesa.itens,
        total: calcularTotal(mesa.itens),
        hora: horaAtual(),
        data: new Date().toLocaleDateString('pt-BR'),
      };

      setDb((atual) => ({
        ...atual,
        historico: [venda, ...atual.historico],
        mesas: atual.mesas.map((m) =>
          m.numero === n ? { ...m, status: 'livre', cliente: '', itens: [], abertaEm: null } : m,
        ),
      }));

      gravar(async () => {
        checar(
          await supabase.from('vendas').insert({
            id: venda.id,
            mesa: venda.mesa,
            cliente: venda.cliente,
            total: venda.total,
            hora: venda.hora,
            data: venda.data,
          }),
        );
        if (venda.itens.length) {
          checar(
            await supabase.from('itens_venda').insert(
              venda.itens.map((i) => ({
                venda_id: venda.id,
                codigo: i.codigo,
                nome: i.nome,
                preco: i.preco,
                quantidade: i.quantidade,
              })),
            ),
          );
        }
        checar(await supabase.from('itens_mesa').delete().eq('mesa_numero', n));
        checar(
          await supabase
            .from('mesas')
            .update({ status: 'livre', cliente: '', aberta_em: null })
            .eq('numero', n),
        );
      });
    },
    [mesas, setDb, gravar],
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