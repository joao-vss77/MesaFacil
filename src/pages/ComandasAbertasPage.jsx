import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useMesas } from '../hooks/useMesas.js';
import { calcularTotal, contarItens } from '../utils/comanda.js';
import { formatarMoeda, pad2 } from '../utils/format.js';

/** Lista de comandas em andamento com valor parcial. */
export default function ComandasAbertasPage() {
  const { comandasAbertas } = useMesas();
  const navigate = useNavigate();

  const colunas = [
    { chave: 'mesa', titulo: 'Mesa', render: (m) => <strong>Mesa {pad2(m.numero)}</strong> },
    { chave: 'cliente', titulo: 'Cliente', render: (m) => m.cliente || '—' },
    { chave: 'abertaEm', titulo: 'Aberta às', render: (m) => m.abertaEm ?? '—' },
    { chave: 'itens', titulo: 'Itens', alinhar: 'right', render: (m) => contarItens(m.itens) },
    { chave: 'parcial', titulo: 'Parcial', alinhar: 'right', render: (m) => formatarMoeda(calcularTotal(m.itens)) },
    {
      chave: 'acoes',
      titulo: '',
      alinhar: 'right',
      render: (m) => (
        <button type="button" className="btn-icon" onClick={() => navigate(`/comandas/${m.numero}`)}>
          Continuar
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader titulo="Comandas abertas" descricao="Valor parcial de cada atendimento em andamento." />
      <Card>
        {comandasAbertas.length ? (
          <DataTable colunas={colunas} dados={comandasAbertas} chaveLinha={(m) => m.numero} />
        ) : (
          <EmptyState titulo="Nenhuma comanda aberta" descricao="As mesas ocupadas aparecem aqui." />
        )}
      </Card>
    </>
  );
}
