import { Component, computed, output, signal } from '@angular/core';

interface Item {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-carrinho',
  standalone: true,
  template: `
    <div>
      <div>Total: R$ {{ total() }}</div>
      <button (click)="adicionarItem()">+</button>
      <button (click)="removerItem()">-</button>
    </div>
  `,
})
export class CarrinhoComponent {
  private carrinhoItens = signal<Item[]>([
    { id: 1, nome: 'Produto', preco: 10, quantidade: 1 },
  ]);

  items = this.carrinhoItens.asReadonly();

  total = computed(() => {
    return this.carrinhoItens().reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0,
    );
  });

  totalChange = output<number>();

  adicionarItem(): void {
    this.carrinhoItens.update((items) => {
      if (items.length === 0) {
        const novosItems = [
          { id: 1, nome: 'Produto', preco: 10, quantidade: 1 },
        ];
        this.totalChange.emit(10); // Emite o novo total
        return novosItems;
      }

      const itemsAtualizados = [...items];
      itemsAtualizados[0] = {
        ...itemsAtualizados[0],
        quantidade: itemsAtualizados[0].quantidade + 1,
      };

      const novoTotal =
        itemsAtualizados[0].preco * itemsAtualizados[0].quantidade;
      this.totalChange.emit(novoTotal);
      return itemsAtualizados;
    });
  }

  removerItem(): void {
    this.carrinhoItens.update((items) => {
      if (items.length === 0) {
        return items;
      }

      const itemsAtualizados = [...items];
      const novaQuantidade = itemsAtualizados[0].quantidade - 1;

      if (novaQuantidade <= 0) {
        this.totalChange.emit(0);
        return [];
      }

      itemsAtualizados[0] = {
        ...itemsAtualizados[0],
        quantidade: novaQuantidade,
      };

      const novoTotal = itemsAtualizados[0].preco * novaQuantidade;
      this.totalChange.emit(novoTotal);
      return itemsAtualizados;
    });
  }
}
