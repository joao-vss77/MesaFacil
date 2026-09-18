import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import Button from '../components/ui/Button.jsx';
import MesaCard from '../components/mesas/MesaCard.jsx';
import NovaComandaModal from '../components/mesas/NovaComandaModal.jsx';
import { useMesas } from '../hooks/useMesas.js';
import { useToast } from '../hooks/useToast.js';
import { formatarMoeda, pad2 } from '../utils/format.js';

/** RF07 — lista de mesas com status e acesso rápido à comanda. */
export default function MesasPage() {
  const { mesas, mesasLivres, indicadores, abrirComanda } = useMesas();
  const { notificar } = useToast();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const selecionarMesa = (mesa) => {
    if (mesa.status === 'ocupada') return navigate(`/comandas/${mesa.numero}`);
    setModal({ mesaPreSelecionada: mesa.numero });
  };

  const abrirModal = () => {
    if (!mesasLivres.length) return notificar('Não há mesas livres no momento.');
    setModal({});
  };

  const confirmar = (numero, cliente) => {
    abrirComanda(numero, cliente);
    setModal(null);
    notificar(`Comanda aberta na Mesa ${pad2(numero)}`);
    navigate(`/comandas/${numero}`);
  };

  return (
    <>
      <PageHeader
        titulo="Salão"
        descricao="Clique em uma mesa para abrir ou continuar a comanda."
        acoes={
          <Button size="sm" onClick={abrirModal}>
            + Nova comanda
          </Button>
        }
      />

      <div className="mb-[34px] grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <StatCard label="Mesas livres" value={indicadores.livres} />
        <StatCard label="Mesas ocupadas" value={indicadores.ocupadas} />
        <StatCard label="Comandas abertas" value={indicadores.comandasAbertas} />
        <StatCard label="Vendas do dia" value={formatarMoeda(indicadores.vendasDoDia)} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {mesas.map((mesa) => (
          <MesaCard key={mesa.numero} mesa={mesa} onSelecionar={selecionarMesa} />
        ))}
      </div>

      {modal && (
        <NovaComandaModal
          mesasLivres={mesasLivres}
          mesaPreSelecionada={modal.mesaPreSelecionada}
          onConfirmar={confirmar}
          onFechar={() => setModal(null)}
        />
      )}
    </>
  );
}
