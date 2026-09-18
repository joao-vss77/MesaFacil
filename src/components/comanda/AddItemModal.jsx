import { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import Field from '../ui/Field.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import TotalBar from './TotalBar.jsx';
import { formatarMoeda } from '../../utils/format.js';

/** Adição de item: lista de produtos, quantidade e confirmação. */
export default function AddItemModal({ produtos, onConfirmar, onFechar }) {
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [erros, setErros] = useState({});

  const produto = produtos.find((p) => p.codigo === codigo);

  const confirmar = () => {
    const novosErros = {};
    if (!codigo) novosErros.codigo = 'Selecione um produto.';
    if (!quantidade || Number(quantidade) < 1) novosErros.quantidade = 'A quantidade deve ser maior que zero.';
    if (Object.keys(novosErros).length) return setErros(novosErros);

    onConfirmar(produto, Number(quantidade));
  };

  return (
    <Modal
      titulo="Adicionar item"
      subtitulo="Escolha o produto e a quantidade."
      onClose={onFechar}
      acoes={
        <>
          <Button variant="ghost" onClick={onFechar}>
            Cancelar
          </Button>
          <Button onClick={confirmar}>Confirmar</Button>
        </>
      }
    >
      <Field label="Produto" htmlFor="produto" error={erros.codigo}>
        <Select
          id="produto"
          value={codigo}
          error={Boolean(erros.codigo)}
          onChange={(e) => {
            setCodigo(e.target.value);
            setErros({});
          }}
        >
          <option value="">Selecione…</option>
          {produtos.map((p) => (
            <option key={p.codigo} value={p.codigo}>
              {p.nome} — {formatarMoeda(p.preco)}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Quantidade" htmlFor="quantidade" error={erros.quantidade}>
        <Input
          id="quantidade"
          type="number"
          min="1"
          value={quantidade}
          error={Boolean(erros.quantidade)}
          onChange={(e) => {
            setQuantidade(e.target.value);
            setErros({});
          }}
        />
      </Field>

      {produto && <TotalBar rotulo="Subtotal" valor={produto.preco * (Number(quantidade) || 0)} />}
    </Modal>
  );
}
