import { hashSenha } from '../utils/crypto.js';

export const TOTAL_MESAS = 12;

export const USUARIO_DEMO = {
  email: 'admin@mesafacil.com',
  senha: '123456',
};

/** Estado inicial do "banco" local. */
export const criarEstadoInicial = () => ({
  usuarios: [
    {
      cpf: '00000000000',
      nome: 'Administrador',
      endereco: 'Matriz',
      cep: '00000000',
      email: USUARIO_DEMO.email,
      senha: hashSenha(USUARIO_DEMO.senha),
    },
  ],
  produtos: [
    { codigo: 'P01', nome: 'Picanha na chapa', preco: 98.9 },
    { codigo: 'P02', nome: 'Filé à parmegiana', preco: 72.5 },
    { codigo: 'B01', nome: 'Chopp 500ml', preco: 18.0 },
    { codigo: 'B02', nome: 'Suco natural', preco: 14.0 },
    { codigo: 'S01', nome: 'Pudim da casa', preco: 22.0 },
  ],
  mesas: Array.from({ length: TOTAL_MESAS }, (_, i) => ({
    numero: i + 1,
    status: 'livre',
    cliente: '',
    itens: [],
    abertaEm: null,
  })),
  historico: [],
});
