import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import ItensTable from '../components/comanda/ItensTable.jsx';
import TotalBar from '../components/comanda/TotalBar.jsx';
import AddItemModal from '../components/comanda/AddItemModal.jsx';
import FecharComandaModal from '../components/comanda/FecharComandaModal.jsx';
import { useMesas } from '../hooks/useMesas.js';
import { useProdutos } from '../hooks/useProdutos.js';
import { useToast } from '../hooks/useToast.js';
import { calcularTotal } from '../utils/comanda.js';
import { pad2 } from '../utils/format.js';

/** RF08 / RF09 — comanda ativa da mesa selecionada. */
export default function ComandaPage() {
  const { numeroMesa } = useParams();
  const navigate = useNavigate();
  const { notificar } = useToast();
  const { produtos } = useProdutos();
  const { buscarMesa, adicionarItem, alterarQuantidade, removerItem, fecharComanda } = useMesas();
  const [modal, setModal] = useState(null);

  const mesa = buscarMesa(numeroMesa);
  if (!mesa || mesa.status === 'livre') return <Navigate to="/" replace />;

  const abrirModalItem = () => {
    if (!produtos.length) return notificar('Cadastre produtos em Configurações.');
    setModal('item');
  };

  const abrirModalFechamento = () => {
    if (!mesa.itens.length) return notificar('Adicione ao menos um item antes de fechar.');
    setModal('fechar');
  };

  const confirmarItem = (produto, quantidade) => {
    adicionarItem(mesa.numero, produto, quantidade);
    setModal(null);
    notificar('Item adicionado à comanda.');
  };

  const confirmarFechamento = () => {
    fecharComanda(mesa.numero);
    setModal(null);
    notificar('Comanda encerrada e registrada no histórico.');
    navigate('/');
  };

  return (
    <>
      <PageHeader
        titulo={`Mesa ${pad2(mesa.numero)}`}
        descricao={`${mesa.cliente ? `Cliente: ${mesa.cliente}` : 'Cliente não informado'} · aberta às ${mesa.abertaEm}`}
        acoes={
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Voltar
            </Button>
            <Button size="sm" onClick={abrirModalItem}>
              + Adicionar item
            </Button>
          </>
        }
      />

      <Card>
        <ItensTable
          itens={mesa.itens}
          onAlterarQuantidade={(codigo, delta) => alterarQuantidade(mesa.numero, codigo, delta)}
          onRemover={(codigo) => removerItem(mesa.numero, codigo)}
        />

        <TotalBar
          valor={calcularTotal(mesa.itens)}
          acao={
            <Button size="sm" onClick={abrirModalFechamento}>
              Fechar comanda
            </Button>
          }
        />
      </Card>

      {modal === 'item' && (
        <AddItemModal produtos={produtos} onConfirmar={confirmarItem} onFechar={() => setModal(null)} />
      )}
      {modal === 'fechar' && (
        <FecharComandaModal mesa={mesa} onConfirmar={confirmarFechamento} onFechar={() => setModal(null)} />
      )}
    </>
  );
}
