// todo.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoActions from './todo.actions';
import { Todo } from './todo.model';
import {
    selectAllTodos,
    selectPendingTodos,
    selectTodosLoading,
} from './todo.selectors';

@Component({
  selector: 'app-todo',
  template: `
    <div *ngIf="loading$ | async" class="loading">Loading...</div>

    <ul>
      <li *ngFor="let todo of todos$ | async">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="toggleTodo(todo.id)"
        />
        <span [style.textDecoration]="todo.completed ? 'line-through' : 'none'">
          {{ todo.title }}
        </span>
      </li>
    </ul>

    <div *ngIf="pendingTodos$ | async as pendingTodos">
      <h3>Pending Tasks: {{ pendingTodos.length }}</h3>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  pendingTodos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.pendingTodos$ = this.store.select(selectPendingTodos);
    this.loading$ = this.store.select(selectTodosLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  toggleTodo(id: string): void {
    this.store.dispatch(TodoActions.toggleTodoComplete({ id }));
  }
}
