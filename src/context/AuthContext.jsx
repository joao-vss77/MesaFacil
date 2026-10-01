import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { apenasDigitos } from '../utils/format.js';

export const AuthContext = createContext(null);

function montarUsuario(user) {
  if (!user) return null;
  const m = user.user_metadata ?? {};
  return {
    email: user.email,
    nome: m.nome || user.email.split('@')[0],
    cpf: m.cpf ?? '',
    endereco: m.endereco ?? '',
    cep: m.cep ?? '',
  };
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUsuario(montarUsuario(data.session?.user));
      setCarregando(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_evento, session) => {
      setUsuario(montarUsuario(session?.user));
      setCarregando(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const entrar = useCallback(async ({ email, senha }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    if (error) {
      return { ok: false, erros: { senha: 'Credenciais inválidas. Verifique e-mail e senha.' } };
    }
    const usuarioLogado = montarUsuario(data.user);
    setUsuario(usuarioLogado);
    return { ok: true, usuario: usuarioLogado };
  }, []);

  const cadastrar = useCallback(async (form) => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.senha,
      options: {
        data: {
          nome: form.nome.trim(),
          cpf: apenasDigitos(form.cpf),
          endereco: form.endereco.trim(),
          cep: apenasDigitos(form.cep),
        },
      },
    });
    if (error) {
      const jaExiste = /already|registered/i.test(error.message);
      return {
        ok: false,
        erros: { email: jaExiste ? 'E-mail já cadastrado.' : error.message },
      };
    }
    if (!data.session) {
      return { ok: false, erros: { email: 'Confirme seu e-mail para entrar.' } };
    }
    const usuarioLogado = montarUsuario(data.user);
    setUsuario(usuarioLogado);
    return { ok: true, usuario: usuarioLogado };
  }, []);

  const sair = useCallback(() => supabase.auth.signOut(), []);

  const alterarSenha = useCallback(
    async ({ senhaAtual, novaSenha }) => {
      const { error: erroLogin } = await supabase.auth.signInWithPassword({
        email: usuario.email,
        password: senhaAtual,
      });
      if (erroLogin) return { ok: false, erros: { senhaAtual: 'Senha atual incorreta.' } };
      const { error } = await supabase.auth.updateUser({ password: novaSenha });
      if (error) return { ok: false, erros: { novaSenha: error.message } };
      return { ok: true };
    },
    [usuario],
  );

  const value = useMemo(
    () => ({ usuario, autenticado: Boolean(usuario), carregando, entrar, cadastrar, sair, alterarSenha }),
    [usuario, carregando, entrar, cadastrar, sair, alterarSenha],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}