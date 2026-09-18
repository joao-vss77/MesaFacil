import { useCallback } from 'react';
import { useStore } from './useStore.js';

/** Cadastro de produtos (RF10) com código único (NRF07). */
export function useProdutos() {
  const { db, setDb } = useStore();
  const { produtos } = db;

  const cadastrar = useCallback(
    ({ nome, codigo, preco }) => {
      const cod = codigo.trim().toUpperCase();
      if (produtos.some((p) => p.codigo === cod)) {
        return { ok: false, erros: { codigo: 'Já existe um produto com este código.' } };
      }
      setDb((atual) => ({ ...atual, produtos: [...atual.produtos, { codigo: cod, nome: nome.trim(), preco }] }));
      return { ok: true };
    },
    [produtos, setDb],
  );

  const atualizarPreco = useCallback(
    (codigo, preco) =>
      setDb((atual) => ({
        ...atual,
        produtos: atual.produtos.map((p) => (p.codigo === codigo ? { ...p, preco } : p)),
      })),
    [setDb],
  );

  const remover = useCallback(
    (codigo) =>
      setDb((atual) => ({ ...atual, produtos: atual.produtos.filter((p) => p.codigo !== codigo) })),
    [setDb],
  );

  const buscarPorCodigo = useCallback(
    (codigo) => produtos.find((p) => p.codigo === codigo) ?? null,
    [produtos],
  );

  return { produtos, cadastrar, atualizarPreco, remover, buscarPorCodigo };
}
