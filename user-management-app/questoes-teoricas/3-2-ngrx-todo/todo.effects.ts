import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { TodoService } from './todo.service';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(
              TodoActions.loadTodosError({
                error: error.message || 'Failed to load todos',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {}
}
