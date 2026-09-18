import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';
import TotalBar from './TotalBar.jsx';
import { formatarMoeda, pad2 } from '../../utils/format.js';
import { calcularTotal } from '../../utils/comanda.js';

/** Fechamento: resumo completo, total final e confirmação. */
export default function FecharComandaModal({ mesa, onConfirmar, onFechar }) {
  return (
    <Modal
      titulo="Resumo do pedido"
      subtitulo={`Mesa ${pad2(mesa.numero)}${mesa.cliente ? ` · ${mesa.cliente}` : ''}`}
      onClose={onFechar}
      acoes={
        <>
          <Button variant="ghost" onClick={onFechar}>
            Voltar
          </Button>
          <Button onClick={onConfirmar}>Confirmar fechamento</Button>
        </>
      }
    >
      <div className="max-h-[240px] overflow-y-auto">
        {mesa.itens.map((item) => (
          <div key={item.codigo} className="flex justify-between border-b border-[#e6e4d7] py-[10px] text-sm">
            <span>
              {item.quantidade}× {item.nome}
            </span>
            <span>{formatarMoeda(item.preco * item.quantidade)}</span>
          </div>
        ))}
      </div>

      <TotalBar rotulo="Total final" valor={calcularTotal(mesa.itens)} />
    </Modal>
  );
}
