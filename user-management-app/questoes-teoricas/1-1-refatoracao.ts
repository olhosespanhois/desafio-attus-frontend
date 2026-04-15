//TAREFA: Considerando seus conhecimentos de TypeScript, qualidade de código e boas práticas, quais melhorias você faria no seguinte código:

// Interface para maior flexibilidade e todos os produtos seguirão um mesmo padrão, evitando erro nos dados armazenados
interface IProduto {
  id: number;
  descricao: string;
  quantidadeEstoque: number;
}

// Classe Produto com encapsulamento deixa os dados privados e libera apenas leitura controlada pelos getters, e com validações barrando dados inválidos logo no nascimento do objeto.
class Produto implements IProduto {
  constructor(
    private _id: number,
    private _descricao: string,
    private _quantidadeEstoque: number,
  ) {
    this.validarDados();
  }

  // Getters com encapsulamento
  get id(): number {
    return this._id;
  }

  get descricao(): string {
    return this._descricao;
  }

  get quantidadeEstoque(): number {
    return this._quantidadeEstoque;
  }

  // Validação dos dados para saber se estão corretos
  private validarDados(): void {
    if (!this._id || this._id <= 0) {
      throw new Error('ID do produto deve ser um número positivo');
    }

    if (!this._descricao || this._descricao.trim().length === 0) {
      throw new Error('Descrição do produto não pode ser vazia');
    }

    if (this._quantidadeEstoque < 0) {
      throw new Error('Quantidade em estoque não pode ser negativa');
    }
  }

  // Método para verificar disponibilidade em estoque
  estaDisponivel(): boolean {
    return this._quantidadeEstoque > 0;
  }

  // Método para formato de exibição do produto
  getDescricaoFormatada(): string {
    return `${this._id} - ${this._descricao} (${this._quantidadeEstoque}x)`;
  }
}
//Criar um arquivo aparte para Interface e para a Classe de produtos, de preferencia dentro de uma pasta models dentro da raiz src, com os seguintes nomes produto.interface.ts (interface) e produto.model.ts (classe com encapsulamento)

// Classe Verdureira com tipagem correta e métodos otimizados
class Verdureira {
  private produtos: Produto[];
  // Tipagem correta: tendo acesso aos metodos e as classes

  constructor() {
    this.produtos = [
      new Produto(1, 'Maçã', 20),
      new Produto(2, 'Laranja', 0),
      new Produto(3, 'Limão', 20),
    ];
  }

  // Método privado para evitar código duplicado (DRY)
  private buscarProduto(produtoId: number): Produto | null {
    for (let index = 0; index < this.produtos.length; index++) {
      if (this.produtos[index].id === produtoId) {
        // comparação estrita (===), comaparendo valor e tipo utilizado
        return this.produtos[index];
      }
    }
    return null;
    // Retorna null se não encontrar
  }

  getDescricaoProduto(produtoId: number): string {
    // Tipo explícito no parâmetro e retorno
    const produto = this.buscarProduto(produtoId);
    if (!produto) {
      return `Produto com ID ${produtoId} não encontrado`;
      // Tratamento de erro identificação não encontrada
    }
    return produto.getDescricaoFormatada();
    // Reutiliza método existente na classe Produto
  }

  hasEstoqueProduto(produtoId: number): boolean {
    // Tipo explícito
    const produto = this.buscarProduto(produtoId);
    if (!produto) {
      return false;
      // Tratamento de erro, produto não existe, não tem estoque
    }
    return produto.estaDisponivel();
    // Reutiliza método existente na classe Produto
  }
}
