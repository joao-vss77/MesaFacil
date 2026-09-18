import { useState } from 'react';
import Field from '../ui/Field.jsx';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { IconChevron } from '../ui/Icons.jsx';
import { mascaraCEP, mascaraCPF } from '../../utils/format.js';
import { temErros, validarCadastro } from '../../utils/validators.js';

const ESTADO_INICIAL = {
  cpf: '',
  nome: '',
  endereco: '',
  cep: '',
  email: '',
  senha: '',
  confirmacaoSenha: '',
};

/** RF03 / RF04 / RF05 — cadastro com campos obrigatórios e confirmação de senha. */
export default function RegisterForm({ onSubmit, onTrocarModo }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState({});

  const alterar = (campo, mascara) => (e) => {
    const valor = mascara ? mascara(e.target.value) : e.target.value;
    setForm((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacao = validarCadastro(form);
    if (temErros(validacao)) return setErros(validacao);

    const resultado = onSubmit(form);
    if (!resultado?.ok) setErros(resultado?.erros ?? {});
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="eyebrow mb-3">Primeiro acesso</p>
      <h1 className="mb-2 text-[46px]">Cadastre-se</h1>
      <p className="mb-[26px] text-sm text-ink-soft">Todos os campos são obrigatórios.</p>

      <Field label="CPF" htmlFor="cpf" error={erros.cpf}>
        <Input id="cpf" value={form.cpf} onChange={alterar('cpf', mascaraCPF)} error={Boolean(erros.cpf)} placeholder="000.000.000-00" />
      </Field>

      <Field label="Nome completo" htmlFor="nome" error={erros.nome}>
        <Input id="nome" value={form.nome} onChange={alterar('nome')} error={Boolean(erros.nome)} placeholder="Seu nome" />
      </Field>

      <Field label="Endereço" htmlFor="endereco" error={erros.endereco}>
        <Input id="endereco" value={form.endereco} onChange={alterar('endereco')} error={Boolean(erros.endereco)} placeholder="Rua, número, bairro" />
      </Field>

      <Field label="CEP" htmlFor="cep" error={erros.cep}>
        <Input id="cep" value={form.cep} onChange={alterar('cep', mascaraCEP)} error={Boolean(erros.cep)} placeholder="00000-000" />
      </Field>

      <Field label="E-mail" htmlFor="email-cadastro" error={erros.email}>
        <Input id="email-cadastro" value={form.email} onChange={alterar('email')} error={Boolean(erros.email)} placeholder="nome@restaurante.com" />
      </Field>

      <Field label="Senha" htmlFor="senha-cadastro" error={erros.senha}>
        <Input id="senha-cadastro" type="password" value={form.senha} onChange={alterar('senha')} error={Boolean(erros.senha)} placeholder="Mínimo 6 caracteres" />
      </Field>

      <Field label="Confirmar senha" htmlFor="confirmacao" error={erros.confirmacaoSenha}>
        <Input id="confirmacao" type="password" value={form.confirmacaoSenha} onChange={alterar('confirmacaoSenha')} error={Boolean(erros.confirmacaoSenha)} placeholder="Repita a senha" />
      </Field>

      <Button type="submit" full className="justify-between">
        Criar conta <IconChevron />
      </Button>

      <div className="my-6 flex items-center gap-4 text-xs text-ink-muted before:h-px before:flex-1 before:bg-line before:content-[''] after:h-px after:flex-1 after:bg-line after:content-['']">
        ou
      </div>

      <Button variant="ghost" full onClick={onTrocarModo}>
        Já tenho conta
      </Button>
    </form>
  );
}
