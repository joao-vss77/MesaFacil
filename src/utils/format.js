/** Formata um número como moeda brasileira. */
export const formatarMoeda = (valor = 0) =>
  Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Converte "1.234,50" em 1234.5. */
export const parsePreco = (texto = '') =>
  parseFloat(String(texto).replace(/\./g, '').replace(',', '.'));

/** Mesa 1 -> "01". */
export const pad2 = (n) => String(n).padStart(2, '0');

export const apenasDigitos = (valor = '') => String(valor).replace(/\D/g, '');

export const mascaraCPF = (valor = '') =>
  apenasDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

export const mascaraCEP = (valor = '') =>
  apenasDigitos(valor).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');

export const horaAtual = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
