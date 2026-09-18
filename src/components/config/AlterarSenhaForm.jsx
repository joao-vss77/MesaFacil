import { useState } from 'react';
import Field from '../ui/Field.jsx';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { isSenhaValida } from '../../utils/validators.js';

const ESTADO_INICIAL = { senhaAtual: '', novaSenha: '', confirmacao: '' };

export default function AlterarSenhaForm({ onAlterar }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState({});

  const alterar = (campo) => (e) => {
    setForm((atual) => ({ ...atual, [campo]: e.target.value }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novosErros = {};
    if (!isSenhaValida(form.novaSenha)) novosErros.novaSenha = 'Mínimo de 6 caracteres.';
    if (form.novaSenha !== form.confirmacao) novosErros.confirmacao = 'As senhas não conferem.';
    if (Object.keys(novosErros).length) return setErros(novosErros);

    const resultado = onAlterar(form);
    if (!resultado?.ok) return setErros(resultado?.erros ?? {});

    setForm(ESTADO_INICIAL);
    setErros({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field label="Senha atual" htmlFor="senha-atual" error={erros.senhaAtual}>
        <Input id="senha-atual" type="password" value={form.senhaAtual} onChange={alterar('senhaAtual')} error={Boolean(erros.senhaAtual)} />
      </Field>

      <Field label="Nova senha" htmlFor="nova-senha" error={erros.novaSenha}>
        <Input id="nova-senha" type="password" value={form.novaSenha} onChange={alterar('novaSenha')} error={Boolean(erros.novaSenha)} />
      </Field>

      <Field label="Confirmar nova senha" htmlFor="confirmacao-senha" error={erros.confirmacao}>
        <Input id="confirmacao-senha" type="password" value={form.confirmacao} onChange={alterar('confirmacao')} error={Boolean(erros.confirmacao)} />
      </Field>

      <Button type="submit" size="sm">
        Salvar nova senha
      </Button>
    </form>
  );
}
