import EmptyState from '../ui/EmptyState.jsx';
import { formatarMoeda } from '../../utils/format.js';

export default function ProdutosTable({ produtos, onEditarPreco, onRemover }) {
  if (!produtos.length) {
    return <EmptyState titulo="Nenhum produto cadastrado" descricao="Cadastre o primeiro item do cardápio." />;
  }

  return (
    <table className="table mt-[10px]">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Código</th>
          <th className="text-right">Preço</th>
          <th aria-label="Ações" />
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.codigo}>
            <td>{produto.nome}</td>
            <td>
              <span className="pill">{produto.codigo}</span>
            </td>
            <td className="num">{formatarMoeda(produto.preco)}</td>
            <td className="num whitespace-nowrap">
              <button type="button" className="btn-icon mr-2" onClick={() => onEditarPreco(produto)}>
                Editar preço
              </button>
              <button type="button" className="btn-icon" onClick={() => onRemover(produto.codigo)}>
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
