import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private mockTodos: Todo[] = [
    {
      id: '1',
      title: 'Aprender NgRx',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Implementar Effects',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Criar Testes com Jest',
      completed: true,
      createdAt: new Date(),
    },
  ];

  getTodos(): Observable<Todo[]> {
    // Simulando chamada HTTP
    return of(this.mockTodos).pipe(delay(1000));
  }
}
