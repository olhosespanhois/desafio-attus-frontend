import * as TodoActions from './todo.actions';
import { initialTodoState } from './todo.model';
import { todoReducer } from './todo.reducer';

describe('Todo Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = todoReducer(undefined, action);

    expect(state).toEqual(initialTodoState);
  });

  it('should set loading to true on loadTodos', () => {
    const action = TodoActions.loadTodos();
    const state = todoReducer(initialTodoState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should load todos on loadTodosSuccess', () => {
    const todos = [
      { id: '1', title: 'Test', completed: false, createdAt: new Date() },
    ];
    const action = TodoActions.loadTodosSuccess({ todos });
    const state = todoReducer(initialTodoState, action);

    expect(state.todos).toEqual(todos);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error on loadTodosError', () => {
    const error = 'Failed to load';
    const action = TodoActions.loadTodosError({ error });
    const state = todoReducer(initialTodoState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should toggle todo complete status', () => {
    const initialState = {
      ...initialTodoState,
      todos: [
        { id: '1', title: 'Test', completed: false, createdAt: new Date() },
      ],
    };

    const action = TodoActions.toggleTodoComplete({ id: '1' });
    const state = todoReducer(initialState, action);

    expect(state.todos[0].completed).toBe(true);
  });
});
