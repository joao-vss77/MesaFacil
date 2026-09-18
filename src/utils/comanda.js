/** Regras de cálculo da comanda. */
export const calcularTotal = (itens = []) =>
  itens.reduce((soma, item) => soma + item.quantidade * item.preco, 0);

export const contarItens = (itens = []) =>
  itens.reduce((soma, item) => soma + item.quantidade, 0);

export const descreverItens = (itens = []) =>
  itens.map((i) => `${i.quantidade}× ${i.nome}`).join(', ');
