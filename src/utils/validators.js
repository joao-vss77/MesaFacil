import { apenasDigitos } from './format.js';

export const isEmailValido = (valor = '') => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valor.trim());

export const isPreenchido = (valor = '') => String(valor).trim().length > 0;

export const isSenhaValida = (valor = '') => String(valor).length >= 6;

export const isCPFValido = (valor = '') => apenasDigitos(valor).length === 11;

export const isCEPValido = (valor = '') => apenasDigitos(valor).length === 8;

/**
 * Valida o formulário de login (RF01).
 * @returns objeto de erros — vazio significa formulário válido.
 */
export function validarLogin({ email, senha }) {
  const erros = {};
  if (!isEmailValido(email)) erros.email = 'Informe um e-mail válido.';
  if (!isSenhaValida(senha)) erros.senha = 'A senha deve ter no mínimo 6 caracteres.';
  return erros;
}

/** Valida o cadastro de usuário (RF03 / RF04 / RF05). */
export function validarCadastro(form) {
  const erros = {};
  if (!isCPFValido(form.cpf)) erros.cpf = 'CPF inválido. Informe 11 dígitos.';
  if (String(form.nome).trim().length < 3) erros.nome = 'Informe o nome completo.';
  if (!isPreenchido(form.endereco)) erros.endereco = 'Informe o endereço.';
  if (!isCEPValido(form.cep)) erros.cep = 'CEP inválido. Informe 8 dígitos.';
  if (!isEmailValido(form.email)) erros.email = 'Informe um e-mail válido.';
  if (!isSenhaValida(form.senha)) erros.senha = 'A senha deve ter no mínimo 6 caracteres.';
  if (!form.confirmacaoSenha || form.confirmacaoSenha !== form.senha) {
    erros.confirmacaoSenha = 'As senhas não conferem.';
  }
  return erros;
}

export const temErros = (erros) => Object.keys(erros).length > 0;
