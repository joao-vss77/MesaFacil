import { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import Field from '../ui/Field.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import { pad2 } from '../../utils/format.js';

/** Abertura de comanda: mesa obrigatória, cliente opcional. */
export default function NovaComandaModal({ mesasLivres, mesaPreSelecionada, onConfirmar, onFechar }) {
  const [numero, setNumero] = useState(mesaPreSelecionada ?? '');
  const [cliente, setCliente] = useState('');
  const [erro, setErro] = useState('');

  const confirmar = () => {
    if (!numero) return setErro('Selecione uma mesa livre.');
    onConfirmar(Number(numero), cliente);
  };

  return (
    <Modal
      titulo="Nova comanda"
      subtitulo="Selecione a mesa e informe o cliente (opcional)."
      onClose={onFechar}
      acoes={
        <>
          <Button variant="ghost" onClick={onFechar}>
            Cancelar
          </Button>
          <Button onClick={confirmar}>Confirmar abertura</Button>
        </>
      }
    >
      <Field label="Mesa" htmlFor="mesa" error={erro}>
        <Select
          id="mesa"
          value={numero}
          error={Boolean(erro)}
          onChange={(e) => {
            setNumero(e.target.value);
            setErro('');
          }}
        >
          <option value="">Selecione…</option>
          {mesasLivres.map((m) => (
            <option key={m.numero} value={m.numero}>
              Mesa {pad2(m.numero)}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Nome do cliente" hint="(opcional)" htmlFor="cliente">
        <Input id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Ex.: Lucas" />
      </Field>
    </Modal>
  );
}
