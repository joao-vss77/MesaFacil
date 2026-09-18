import { useCallback, useMemo } from 'react';
import { useStore } from './useStore.js';
import { hashSenha, senhaConfere } from '../utils/crypto.js';
import { apenasDigitos } from '../utils/format.js';

/** Regras de autenticação e cadastro (RF01 a RF05, NRF02, NRF08). */
export function useAuth() {
  const { db, setDb, sessao, setSessao } = useStore();

  const usuario = useMemo(
    () => db.usuarios.find((u) => u.email === sessao?.email) ?? null,
    [db.usuarios, sessao],
  );

  const entrar = useCallback(
    ({ email, senha }) => {
      const encontrado = db.usuarios.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && senhaConfere(senha, u.senha),
      );
      if (!encontrado) {
        return { ok: false, erros: { senha: 'Credenciais inválidas. Verifique e-mail e senha.' } };
      }
      setSessao({ email: encontrado.email });
      return { ok: true, usuario: encontrado };
    },
    [db.usuarios, setSessao],
  );

  const cadastrar = useCallback(
    (form) => {
      const cpf = apenasDigitos(form.cpf);
      const email = form.email.trim();
      const erros = {};
      if (db.usuarios.some((u) => u.cpf === cpf)) erros.cpf = 'CPF já cadastrado.';
      if (db.usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        erros.email = 'E-mail já cadastrado.';
      }
      if (Object.keys(erros).length) return { ok: false, erros };

      const novo = {
        cpf,
        nome: form.nome.trim(),
        endereco: form.endereco.trim(),
        cep: apenasDigitos(form.cep),
        email,
        senha: hashSenha(form.senha),
      };
      setDb((atual) => ({ ...atual, usuarios: [...atual.usuarios, novo] }));
      setSessao({ email: novo.email });
      return { ok: true, usuario: novo };
    },
    [db.usuarios, setDb, setSessao],
  );

  const sair = useCallback(() => setSessao(null), [setSessao]);

  const alterarSenha = useCallback(
    ({ senhaAtual, novaSenha }) => {
      if (!usuario || !senhaConfere(senhaAtual, usuario.senha)) {
        return { ok: false, erros: { senhaAtual: 'Senha atual incorreta.' } };
      }
      setDb((atual) => ({
        ...atual,
        usuarios: atual.usuarios.map((u) =>
          u.email === usuario.email ? { ...u, senha: hashSenha(novaSenha) } : u,
        ),
      }));
      return { ok: true };
    },
    [usuario, setDb],
  );

  return { usuario, autenticado: Boolean(usuario), entrar, cadastrar, sair, alterarSenha };
}
