/**
 * Hash simples e determinístico para não armazenar a senha em texto puro (NRF08).
 * Em produção deve ser substituído por bcrypt/Argon2 no backend.
 */
export function hashSenha(senha = '') {
  let h = 0;
  for (let i = 0; i < senha.length; i += 1) {
    h = (h << 5) - h + senha.charCodeAt(i);
    h |= 0;
  }
  return `h${Math.abs(h).toString(36)}`;
}

export const senhaConfere = (senhaDigitada, hashArmazenado) =>
  hashSenha(senhaDigitada) === hashArmazenado;
