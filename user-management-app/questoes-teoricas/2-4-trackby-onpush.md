# Performance — OnPush e trackBy

Considere uma lista com centenas de itens renderizados com @for (ngFor).
**Explique:**

1. Por que usar trackBy melhora a performance e como implementá-lo corretamente
2. Como ChangeDetectionStrategy.OnPush pode reduzir ciclos desnecessários de detecção neste cenário
3. Qual seria o impacto de usar a estratégia Default neste caso

## Respostas

### 1. Por que usar trackBy melhora a performance e como implementá-lo corretamente

Porque, ele fornece ao Angular uma função que retorna um identificador unico para cada item, que deve ser imutavel e estável ao longo do tempo. Realizando uma veificação precisa, ele averigua quais itens do array antigo estão presentes no array novo através de seus identificadores, identifica exatamente quais itens foram adicionados, removidos ou modificados, e então realiza alterações precisas no DOM, atualizando apenas os elementos que realmente mudaram.

**Exemplos de implementação:**

```typescript
// ID único e imutável
trackByProdutoId(index: number, produto: Produto): number {
  return produto.id;
}

// Chave composta se necessário, com uma combinação única
trackByChaveComposta(index: number, item: Item): string {
  return `${item.tipo}_${item.id}`;
}

// Para listas sem ID natural
trackByIndex(index: number, item: any): number {
  return index;
}

/** No exemplo acima ocorre um Fallback, mas não é ideal de utilização,
 * porém pode ser utilizada casos restrito, como listas pequenas, listas
 * estaticas, listas sem IDs e listas efêmeras, onde os componentes
 * são destruidos com frequência. Por isso devemos usar trackByIndex
 * apenas como último recurso em listas completamente estáticas.
*/
```

### 2. Como ChangeDetectionStrategy.OnPush pode reduzir ciclos desnecessários de detecção neste cenário

No caso o ChangeDetectionStrategy.OnPush reduz os ciclos de detecção, pois só existe verificação de um componente quando: um @Input recebe uma nova referência, um evento ocorre em um componente ou nos filhos deste componente, em caso de uma detecção forçada manualmente, ou quando um Observable emite via um async pipe

### 3. Qual seria o impacto de usar a estratégia Default neste caso

Ele poderia causar problemas de performance no carregamento dos dados, lag em interações como scroll, animações e digitação, alto consumo de CPU e escalabilidade do projeto comprometida
