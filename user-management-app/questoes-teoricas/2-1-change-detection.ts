/**TAREFA: Identifique o problema, explique o motivo e proponha
 * a correção — sem alterar a estratégia, sem modificar
 * PessoaService e sem remover o setInterval.
 * */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
class PessoaService {
  /** @description Mock de uma busca em API com retorno em 0.5 segundos */
  buscarPorId(id: number) {
    return of({ id, nome: 'João' }).pipe(delay(500));
  }
}

@Component({
  selector: 'app-root',
  providers: [PessoaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>{{ texto }}</h1>`,
})
export class AppComponent implements OnInit, OnDestroy {
  texto: string;
  contador = 0;
  subscriptionBuscarPessoa: Subscription;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subscriptionBuscarPessoa = this.pessoaService
      .buscarPorId(1)
      .subscribe((pessoa) => {
        this.texto = `Nome: ${pessoa.nome}`;
        this.cdr.detectChanges(); // Força detecção imediata
      });

    this.intervalId = setInterval(() => {
      this.contador++;
      this.cdr.detectChanges(); // Força detecção imediata
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptionBuscarPessoa?.unsubscribe();
    if (this.intervalId) clearInterval(this.intervalId);
  }
}

/** Explicação: Esta é uma solução simples, onde eu forço a detecção
 * de mudanças ignorando o OnPush, para que aja a mudança apenas quando necessário.
 * Atribuindo o tipo ReturnType<typeof setInterval> | null = null ao intervalId,
 * estou dizendo que o intervalId, number (browser) OU NodeJS.Timeout (Node) OU null,
 * dependendo do retorno da função. Aplicando o unsubscribe() e o clearInterval(this.intervalId),
 * por boa prática evito vazamento de memória, se o componente fosse destruindo */
