import { useState } from 'react';
import Field from '../ui/Field.jsx';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { IconChevron, IconEye, IconEyeOff, IconLock, IconMail } from '../ui/Icons.jsx';
import { USUARIO_DEMO } from '../../constants/seed.js';
import { temErros, validarLogin } from '../../utils/validators.js';

/** RF01 — autenticação com credenciais já cadastradas. */
export default function LoginForm({ onSubmit, onTrocarModo }) {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erros, setErros] = useState({});
  const [verSenha, setVerSenha] = useState(false);

  const alterar = (campo) => (e) => {
    setForm((atual) => ({ ...atual, [campo]: e.target.value }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacao = validarLogin(form);
    if (temErros(validacao)) return setErros(validacao);

    const resultado = onSubmit(form);
    if (!resultado?.ok) setErros(resultado?.erros ?? {});
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="eyebrow mb-3">Bem-vindo de volta</p>
      <h1 className="mb-2 text-[46px]">Entre na sua conta</h1>
      <p className="mb-[26px] text-sm text-ink-soft">Use suas credenciais para continuar o atendimento.</p>

      <Field label="E-mail" htmlFor="email" error={erros.email} icon={<IconMail />}>
        <Input
          id="email"
          name="email"
          autoComplete="username"
          hasIcon
          error={Boolean(erros.email)}
          value={form.email}
          onChange={alterar('email')}
          placeholder="nome@restaurante.com"
        />
      </Field>

      <Field
        label="Senha"
        htmlFor="senha"
        error={erros.senha}
        icon={<IconLock />}
        action={
          <button
            type="button"
            onClick={() => setVerSenha((v) => !v)}
            aria-label={verSenha ? 'Ocultar senha' : 'Mostrar senha'}
            className="p-1 text-ink-muted transition hover:text-ink"
          >
            {verSenha ? <IconEyeOff /> : <IconEye />}
          </button>
        }
      >
        <Input
          id="senha"
          name="senha"
          type={verSenha ? 'text' : 'password'}
          autoComplete="current-password"
          hasIcon
          hasAction
          error={Boolean(erros.senha)}
          value={form.senha}
          onChange={alterar('senha')}
          placeholder="Sua senha"
        />
      </Field>

      <Button type="submit" full className="justify-between">
        Entrar <IconChevron />
      </Button>

      <div className="my-6 flex items-center gap-4 text-xs text-ink-muted before:h-px before:flex-1 before:bg-line before:content-[''] after:h-px after:flex-1 after:bg-line after:content-['']">
        ou
      </div>

      {/* RF02 — acesso ao cadastro para quem ainda não tem conta */}
      <Button variant="ghost" full onClick={onTrocarModo}>
        Criar uma conta
      </Button>

      <p className="mt-[18px] text-center text-xs leading-relaxed text-ink-muted">
        Demo: <strong>{USUARIO_DEMO.email}</strong> · senha <strong>{USUARIO_DEMO.senha}</strong>
      </p>
    </form>
  );
}
