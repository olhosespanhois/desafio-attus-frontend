/**
 Implemente uma função genérica filtrarEPaginar<T> que recebe um array, um predicado de filtro e parâmetros de paginação (página e tamanho). A função deve retornar os itens da página atual e o total de registros filtrados. Use tipagem completa — sem any.
Exemplo de parâmetros:

 filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams
): Pagina<T>

 */

// Interface para os parâmetros de paginação
interface PaginaParams {
  pagina: number; // Número da página (começando em 1)
  tamanho: number; // Quantidade de itens por página
}

// T é um placeholder que será substituído pelo tipo real na hora de usar e quando tem o <>, ele está declarando como tipo generico

// Interface para o retorno paginado
interface Pagina<T> {
  dados: T[]; // Itens da página atual
  total: number; // Total de itens filtrados
  paginaAtual: number; // Página atual
  totalPaginas: number; // Total de páginas
  temProxima: boolean; // Indica se existe próxima página
  temAnterior: boolean; // Indica se existe página anterior
}

// Função filtrarEPaginar
function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams,
): Pagina<T> {
  // Validações dos parâmetros
  if (!Array.isArray(data)) {
    throw new Error('O parâmetro "data" deve ser um array');
  }

  if (typeof filterFn !== 'function') {
    throw new Error('O parâmetro "filterFn" deve ser uma função');
  }

  if (params.pagina < 1) {
    throw new Error('O número da página deve ser maior ou igual a 1');
  }

  if (params.tamanho < 1) {
    throw new Error('O tamanho da página deve ser maior ou igual a 1');
  }

  // Aplica o filtro
  const itensFiltrados = data.filter(filterFn);

  // Calcula o total de itens filtrados
  const total = itensFiltrados.length;

  // Calcula o índice inicial e final para paginação
  const inicio = (params.pagina - 1) * params.tamanho;
  const fim = inicio + params.tamanho;

  // Obtém os itens da página atual
  const dados = itensFiltrados.slice(inicio, fim);

  // Calcula informações adicionais
  const totalPaginas = Math.ceil(total / params.tamanho);
  const temProxima = params.pagina < totalPaginas;
  const temAnterior = params.pagina > 1;

  // Retorna o objeto paginado
  return {
    dados,
    total,
    paginaAtual: params.pagina,
    totalPaginas,
    temProxima,
    temAnterior,
  };
}

// Classe do Paginamento que pode ser reaproveitado em diversos arquivos
class Paginador<T> {
  private tamanhoPadrao: number;
  private paginaPadrao: number;

  constructor(
    private dados: T[],
    config?: { paginaPadrao?: number; tamanhoPadrao?: number },
  ) {
    this.paginaPadrao = config?.paginaPadrao ?? 1; // recebe um numero de página customizado, ou inicia pela página 1
    this.tamanhoPadrao = config?.tamanhoPadrao ?? 10; // recebe um quantidade de produtos customizado, ou inicia com 10 produtos
  }
  // Função que recebe os valores enviados pelo componente para realizar a páginação
  paginar(
    pagina: number = this.paginaPadrao,
    tamanho: number = this.tamanhoPadrao,
    filtro?: (item: T) => boolean,
  ): Pagina<T> {
    const filtrados = filtro ? this.dados.filter(filtro) : [...this.dados];
    const inicio = (pagina - 1) * tamanho;

    return {
      dados: filtrados.slice(inicio, inicio + tamanho),
      total: filtrados.length,
      paginaAtual: pagina,
      totalPaginas: Math.ceil(filtrados.length / tamanho),
      temProxima: pagina < Math.ceil(filtrados.length / tamanho),
      temAnterior: pagina > 1,
    };
  }
}

// Interface para o exemplo de produtos com paginador
interface Produtos {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  emEstoque: boolean;
}

// Mock de produtos
const produtos: Produtos[] = [
  {
    id: 1,
    nome: 'Notebook',
    preco: 3500,
    categoria: 'Eletrônicos',
    emEstoque: true,
  },
  {
    id: 2,
    nome: 'Mouse',
    preco: 50,
    categoria: 'Periféricos',
    emEstoque: true,
  },
  {
    id: 3,
    nome: 'Teclado',
    preco: 120,
    categoria: 'Periféricos',
    emEstoque: false,
  },
  {
    id: 4,
    nome: 'Monitor',
    preco: 1200,
    categoria: 'Eletrônicos',
    emEstoque: true,
  },
  {
    id: 5,
    nome: 'Cadeira Gamer',
    preco: 800,
    categoria: 'Móveis',
    emEstoque: true,
  },
];

// Criar paginador no componente depois de importa-lo
const p = new Paginador(produtos);
// Entradas possíveis pelo usuário
p.paginar(); // Tudo padrão
p.paginar(2); // Página 2, tamanho 10
p.paginar(2, 5); // Página 2, tamanho 5
p.paginar(1, 10, (p) => p.preco > 5); // Com filtro
