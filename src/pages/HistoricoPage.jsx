import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useHistorico } from '../hooks/useHistorico.js';
import { useToast } from '../hooks/useToast.js';
import { descreverItens } from '../utils/comanda.js';
import { formatarMoeda, pad2 } from '../utils/format.js';

/** RF11 — histórico de comandas encerradas. */
export default function HistoricoPage() {
  const { historico, resumo, limpar } = useHistorico();
  const { notificar } = useToast();

  const colunas = [
    { chave: 'hora', titulo: 'Hora' },
    { chave: 'mesa', titulo: 'Mesa', render: (v) => `Mesa ${pad2(v.mesa)}` },
    { chave: 'cliente', titulo: 'Cliente', render: (v) => v.cliente || '—' },
    {
      chave: 'itens',
      titulo: 'Itens consumidos',
      render: (v) => <span className="text-[13px] text-ink-soft">{descreverItens(v.itens)}</span>,
    },
    { chave: 'total', titulo: 'Total', alinhar: 'right', render: (v) => <strong>{formatarMoeda(v.total)}</strong> },
  ];

  return (
    <>
      <PageHeader
        titulo="Histórico de vendas"
        descricao="Comandas encerradas — mesa, itens consumidos e valor total."
        acoes={
          historico.length ? (
            <button
              type="button"
              className="btn-icon"
              onClick={() => {
                limpar();
                notificar('Histórico limpo.');
              }}
            >
              Limpar histórico
            </button>
          ) : null
        }
      />

      <div className="mb-[34px] grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        <StatCard label="Comandas fechadas" value={resumo.quantidade} />
        <StatCard label="Faturamento" value={formatarMoeda(resumo.faturamento)} />
        <StatCard label="Ticket médio" value={formatarMoeda(resumo.ticketMedio)} />
      </div>

      <Card>
        {historico.length ? (
          <DataTable colunas={colunas} dados={historico} />
        ) : (
          <EmptyState titulo="Sem vendas registradas" descricao="Feche uma comanda para gerar histórico." />
        )}
      </Card>
    </>
  );
}
