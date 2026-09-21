import { useCallback } from 'react';
import { useStore } from './useStore.js';
import { supabase } from '../lib/supabase.js';
import { checar } from '../lib/checar.js';

/** Cadastro de produtos (RF10) com código único (NRF07), gravado no Supabase. */
export function useProdutos() {
  const { db, setDb, gravar } = useStore();
  const { produtos } = db;

  const cadastrar = useCallback(
    ({ nome, codigo, preco }) => {
      const cod = codigo.trim().toUpperCase();
      if (produtos.some((p) => p.codigo === cod)) {
        return { ok: false, erros: { codigo: 'Já existe um produto com este código.' } };
      }
      const novo = { codigo: cod, nome: nome.trim(), preco };
      setDb((atual) => ({ ...atual, produtos: [...atual.produtos, novo] }));
      gravar(async () => checar(await supabase.from('produtos').insert(novo)));
      return { ok: true };
    },
    [produtos, setDb, gravar],
  );

  const atualizarPreco = useCallback(
    (codigo, preco) => {
      setDb((atual) => ({
        ...atual,
        produtos: atual.produtos.map((p) => (p.codigo === codigo ? { ...p, preco } : p)),
      }));
      gravar(async () => checar(await supabase.from('produtos').update({ preco }).eq('codigo', codigo)));
    },
    [setDb, gravar],
  );

  const remover = useCallback(
    (codigo) => {
      setDb((atual) => ({ ...atual, produtos: atual.produtos.filter((p) => p.codigo !== codigo) }));
      gravar(async () => checar(await supabase.from('produtos').delete().eq('codigo', codigo)));
    },
    [setDb, gravar],
  );

  const buscarPorCodigo = useCallback(
    (codigo) => produtos.find((p) => p.codigo === codigo) ?? null,
    [produtos],
  );

  return { produtos, cadastrar, atualizarPreco, remover, buscarPorCodigo };
}