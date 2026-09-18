import QuantityStepper from './QuantityStepper.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import { formatarMoeda } from '../../utils/format.js';

/** RF09 — nome do produto, quantidade, valor unitário e subtotal. */
export default function ItensTable({ itens, onAlterarQuantidade, onRemover }) {
  if (!itens.length) {
    return <EmptyState titulo="Comanda sem itens" descricao="Adicione o primeiro pedido para começar." />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Código</th>
          <th className="text-right">Qtd</th>
          <th className="text-right">Unitário</th>
          <th className="text-right">Subtotal</th>
          <th aria-label="Ações" />
        </tr>
      </thead>
      <tbody>
        {itens.map((item) => (
          <tr key={item.codigo}>
            <td>{item.nome}</td>
            <td>
              <span className="pill">{item.codigo}</span>
            </td>
            <td className="num">
              <QuantityStepper
                quantidade={item.quantidade}
                onAlterar={(delta) => onAlterarQuantidade(item.codigo, delta)}
              />
            </td>
            <td className="num">{formatarMoeda(item.preco)}</td>
            <td className="num">
              <strong>{formatarMoeda(item.preco * item.quantidade)}</strong>
            </td>
            <td className="num">
              <button type="button" className="btn-icon" onClick={() => onRemover(item.codigo)} aria-label={`Remover ${item.nome}`}>
                ×
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
