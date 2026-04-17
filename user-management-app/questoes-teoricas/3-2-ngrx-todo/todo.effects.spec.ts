import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import * as TodoActions from './todo.actions';
import { TodoEffects } from './todo.effects';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let todoService: jest.Mocked<TodoService>;

  const mockTodos: Todo[] = [
    { id: '1', title: 'Test', completed: false, createdAt: new Date() },
  ];

  beforeEach(() => {
    const todoServiceMock = {
      getTodos: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        { provide: TodoService, useValue: todoServiceMock },
      ],
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(TodoService) as jest.Mocked<TodoService>;
  });

  it('should return loadTodosSuccess on successful load', (done) => {
    const action = TodoActions.loadTodos();
    const outcome = TodoActions.loadTodosSuccess({ todos: mockTodos });

    actions$ = of(action);
    todoService.getTodos.mockReturnValue(of(mockTodos));

    effects.loadTodos$.subscribe((result) => {
      expect(result).toEqual(outcome);
      done();
    });
  });

  it('should return loadTodosError on failed load', (done) => {
    const action = TodoActions.loadTodos();
    const error = new Error('Network error');
    const outcome = TodoActions.loadTodosError({ error: error.message });

    actions$ = of(action);
    todoService.getTodos.mockReturnValue(throwError(() => error));

    effects.loadTodos$.subscribe((result) => {
      expect(result).toEqual(outcome);
      done();
    });
  });
});
