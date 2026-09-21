/** Lança o erro do Supabase, para o `gravar` poder tratá-lo. */
export const checar = (resposta) => {
  if (resposta.error) throw resposta.error;
  return resposta;
};