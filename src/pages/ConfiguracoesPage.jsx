import PageHeader from '../components/layout/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import ProdutoForm from '../components/config/ProdutoForm.jsx';
import ProdutosTable from '../components/config/ProdutosTable.jsx';
import AlterarSenhaForm from '../components/config/AlterarSenhaForm.jsx';
import SistemaInfo from '../components/config/SistemaInfo.jsx';
import { useProdutos } from '../hooks/useProdutos.js';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { parsePreco } from '../utils/format.js';

/** RF10 + alteração de senha + informações do sistema. */
export default function ConfiguracoesPage() {
  const { produtos, cadastrar, atualizarPreco, remover } = useProdutos();
  const { usuario, alterarSenha } = useAuth();
  const { notificar } = useToast();

  const handleCadastrar = (dados) => {
    const resultado = cadastrar(dados);
    if (resultado.ok) notificar('Produto cadastrado.');
    return resultado;
  };

  const handleEditarPreco = (produto) => {
    const entrada = window.prompt(
      `Novo preço para ${produto.nome} (R$):`,
      String(produto.preco).replace('.', ','),
    );
    if (entrada === null) return;

    const preco = parsePreco(entrada);
    if (Number.isNaN(preco) || preco <= 0) return notificar('Preço inválido.');

    atualizarPreco(produto.codigo, preco);
    notificar('Preço atualizado.');
  };

  const handleAlterarSenha = (dados) => {
    const resultado = alterarSenha(dados);
    if (resultado.ok) notificar('Senha alterada com sucesso.');
    return resultado;
  };

  return (
    <>
      <PageHeader
        titulo="Configurações"
        descricao="Cadastro de produtos, preços, segurança e informações do sistema."
      />

      <Card title="Cadastro de produto" className="mb-5">
        <ProdutoForm onCadastrar={handleCadastrar} />
        <ProdutosTable
          produtos={produtos}
          onEditarPreco={handleEditarPreco}
          onRemover={(codigo) => {
            remover(codigo);
            notificar('Produto removido.');
          }}
        />
      </Card>

      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <Card title="Alterar senha">
          <AlterarSenhaForm onAlterar={handleAlterarSenha} />
        </Card>
        <Card title="Informações do sistema">
          <SistemaInfo usuario={usuario} />
        </Card>
      </div>
    </>
  );
}
