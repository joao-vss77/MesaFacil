import { useEffect, useState } from 'react';

/**
 * Espelha um estado do React no localStorage.
 * Garante que os dados não se percam ao fechar o aplicativo (NRF01).
 */
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = window.localStorage.getItem(chave);
      if (salvo !== null) return JSON.parse(salvo);
    } catch (erro) {
      console.warn(`Falha ao ler "${chave}" do localStorage.`, erro);
    }
    return typeof valorInicial === 'function' ? valorInicial() : valorInicial;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      console.warn(`Falha ao gravar "${chave}" no localStorage.`, erro);
    }
  }, [chave, valor]);

  return [valor, setValor];
}
