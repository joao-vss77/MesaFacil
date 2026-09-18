# Mesa Fácil — N2APP

Aplicação web do **Sprint 2** do projeto *Desenvolvimento para Dispositivos Android*.
Protótipo funcional das telas e regras de negócio do app de controle de mesas, comandas e vendas.

> **Grupo:** João Victor da Silva Santos · Nicole Santos Oikawa · Nicole Rodrigues Nascimento da Silva

---

## Stack

| Camada | Tecnologia |
|---|---|
| Biblioteca de UI | React 18 |
| Build / dev server | Vite 5 |
| Estilização | Tailwind CSS 3 |
| Rotas | React Router 6 |
| Persistência | `localStorage` via hook próprio |

---

## Como rodar

```bash
npm install     # instala as dependências
npm run dev     # sobe em http://localhost:5173
npm run build   # gera a versão de produção em /dist
npm run preview # serve o build localmente
```

**Usuário de demonstração:** `admin@mesafacil.com` · senha `123456`

---

## Estrutura de pastas

```
mesa-facil/
├── index.html
├── package.json
├── vite.config.js          # alias "@" apontando para /src
├── tailwind.config.js      # paleta, fontes e animações do design system
├── postcss.config.js
└── src/
    ├── main.jsx            # bootstrap: Router + Providers
    ├── App.jsx             # mapa de rotas
    ├── index.css           # camadas base/components do Tailwind
    ├── assets/
    ├── components/
    │   ├── ui/             # design system (Button, Input, Modal, Table…)
    │   ├── layout/         # AppLayout, Topbar, NavTabs, PageHeader
    │   ├── auth/           # LoginForm, RegisterForm, RequireAuth, BrandPanel
    │   ├── mesas/          # MesaCard, NovaComandaModal
    │   ├── comanda/        # ItensTable, QuantityStepper, TotalBar, modais
    │   └── config/         # ProdutoForm, ProdutosTable, AlterarSenhaForm
    ├── pages/              # uma página por rota
    ├── hooks/              # useAuth, useMesas, useProdutos, useHistorico…
    ├── context/            # StoreContext (estado global) e ToastContext
    ├── utils/              # format, validators, crypto, regras da comanda
    └── constants/          # seed inicial, chaves de storage, navegação
```

### Princípios adotados

- **Componentes puros e reutilizáveis** em `components/ui` — sem regra de negócio.
- **Regras de negócio isoladas em hooks** (`useMesas`, `useProdutos`, `useAuth`), o que mantém as páginas enxutas e facilita o transporte da lógica para o app Android.
- **Estado global único** no `StoreContext`, espelhado automaticamente no `localStorage`.
- **Validações centralizadas** em `utils/validators.js`, retornando um objeto de erros por campo.
- **Tailwind com classes semânticas** (`.btn-primary`, `.card`, `.input`) declaradas em `@layer components`, evitando repetição de dezenas de utilitários no JSX.

---

## Rotas

| Rota | Página | Requisito |
|---|---|---|
| `/login` | Login e cadastro | RF01 – RF05 |
| `/` | Salão (lista de mesas) | RF06 / RF07 |
| `/comandas` | Comandas abertas | RF07 |
| `/comandas/:numeroMesa` | Comanda ativa | RF08 / RF09 |
| `/historico` | Histórico de vendas | RF11 |
| `/configuracoes` | Produtos, senha e sistema | RF10 |

---

## Cobertura dos requisitos

### Funcionais

| Requisito | Onde está implementado |
|---|---|
| RF01 — Login com credenciais válidas | `LoginForm` + `useAuth.entrar` |
| RF02 — Opção de cadastro na tela inicial | `AuthPage` (alterna login/cadastro) |
| RF03 — Cadastro com CPF, nome, endereço, CEP, e-mail e senha | `RegisterForm` |
| RF04 — Campos obrigatórios | `validarCadastro` |
| RF05 — Confirmação de senha | `validarCadastro` |
| RF06 / RF07 — Menu principal com lista de mesas | `MesasPage` + `NavTabs` |
| RF08 — Clicar na mesa abre a comanda | `MesaCard` → rota `/comandas/:numeroMesa` |
| RF09 — Nome, quantidade, valor unitário e total | `ItensTable` + `calcularTotal` |
| RF10 — Cadastro de produto (nome, código, preço) | `ProdutoForm` + `useProdutos` |
| RF11 — Histórico de comandas encerradas | `useMesas.fecharComanda` + `HistoricoPage` |

### Não funcionais

| Requisito | Como é atendido |
|---|---|
| NRF01 — Não perder dados preenchidos | `useLocalStorage` grava a cada alteração |
| NRF02 — Bloquear acesso sem credenciais | `RequireAuth` protege todas as rotas internas |
| NRF07 — Impedir duplicidade de código | `useProdutos.cadastrar` valida código único |
| NRF08 — Senha criptografada | `utils/crypto.js` (hash; trocar por bcrypt no backend) |
| NRF09 — Suportar muitas mesas | `TOTAL_MESAS` configurável em `constants/seed.js` |
| NRF11 — Persistência de dados | `StoreContext` + `localStorage` |

---

## Próximos passos sugeridos

1. Substituir o `localStorage` por uma API REST com banco relacional.
2. Trocar o hash local por autenticação com token (JWT) e bcrypt no servidor.
3. Migrar as regras dos hooks para os ViewModels do app Android.
# MesaFacil
