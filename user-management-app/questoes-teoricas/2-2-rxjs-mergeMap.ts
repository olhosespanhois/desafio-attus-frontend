/**TAREFA: Refatore o código abaixo eliminando o subscribe dentro de subscribe.
 * Use operadores RxJS adequados, evite memory leaks
 *  e explique brevemente sua escolha de operador:
 */

import { OnDestroy, OnInit } from '@angular/core';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
export class AppComponentRxJSMergeMap implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  pessoaService: any;
  texto: string = '';

  ngOnInit(): void {
    const pessoaId = 1;
    this.pessoaService
      .buscarPorId(pessoaId)
      .pipe(
        takeUntil(this.destroy$), //takeUntil para fazer o gerenciamento de múltiplas subscriptions com uma única linha, evitando de dar unsubscribe em algum observable
        switchMap((pessoa) =>
          // O switchMap cancela requisição anterior se nova chegar, assim permitindo que seja feita a busca mais recentes
          this.pessoaService.buscarQuantidadeFamiliares(pessoaId).pipe(
            map((qtd) => ({ pessoa, qtd })),
            // O map combina o resultado da pessoa, com a quantidade de familiares
          ),
        ),
      )
      .subscribe(({ pessoa, qtd }) => {
        this.texto = `Nome: ${pessoa.nome} | familiares: ${qtd}`;
      });
  }
  // Com o unsubscribe, posso cancelar todos os observables com takeUntil(this.destroy$) e limpar todos os Subject, quando o componente for destruído, evitando vazamentos de memória e execuções indesejadas.
  ngOnDestroy(): void {
    this.destroy$.next(); // ele dispara o takeUntil(this.destroy$), cancelando todos os existentes no código
    this.destroy$.complete();
  }
}
