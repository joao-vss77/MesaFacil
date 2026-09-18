import { useState } from 'react';
import Field from '../ui/Field.jsx';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { parsePreco } from '../../utils/format.js';
import { isPreenchido } from '../../utils/validators.js';

const ESTADO_INICIAL = { nome: '', codigo: '', preco: '' };

/** RF10 — cadastro de produto com nome, código e preço. */
export default function ProdutoForm({ onCadastrar }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState({});

  const alterar = (campo) => (e) => {
    setForm((atual) => ({ ...atual, [campo]: e.target.value }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preco = parsePreco(form.preco);
    const novosErros = {};
    if (!isPreenchido(form.nome)) novosErros.nome = 'Informe o nome.';
    if (!isPreenchido(form.codigo)) novosErros.codigo = 'Código obrigatório.';
    if (Number.isNaN(preco) || preco <= 0) novosErros.preco = 'Preço inválido.';
    if (Object.keys(novosErros).length) return setErros(novosErros);

    const resultado = onCadastrar({ ...form, preco });
    if (!resultado?.ok) return setErros(resultado?.erros ?? {});

    setForm(ESTADO_INICIAL);
    setErros({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-[2fr_1fr_1fr_auto] items-start gap-[14px] max-lg:grid-cols-1">
      <Field label="Nome do produto" htmlFor="produto-nome" error={erros.nome} className="mb-0">
        <Input id="produto-nome" value={form.nome} onChange={alterar('nome')} error={Boolean(erros.nome)} placeholder="Ex.: Água com gás" />
      </Field>

      <Field label="Código" htmlFor="produto-codigo" error={erros.codigo} className="mb-0">
        <Input id="produto-codigo" value={form.codigo} onChange={alterar('codigo')} error={Boolean(erros.codigo)} placeholder="Ex.: B04" />
      </Field>

      <Field label="Preço (R$)" htmlFor="produto-preco" error={erros.preco} className="mb-0">
        <Input id="produto-preco" value={form.preco} onChange={alterar('preco')} error={Boolean(erros.preco)} placeholder="0,00" />
      </Field>

      <Button type="submit" size="sm" className="mt-[27px] max-lg:mt-0">
        Cadastrar
      </Button>
    </form>
  );
}
