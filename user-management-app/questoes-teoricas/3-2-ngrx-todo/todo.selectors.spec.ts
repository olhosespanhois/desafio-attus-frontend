import { TodoState } from './todo.model';
import {
    selectAllTodos,
    selectPendingTodos
} from './todo.selectors';

describe('Todo Selectors', () => {
  const initialState: TodoState = {
    todos: [
      { id: '1', title: 'Task 1', completed: false, createdAt: new Date() },
      { id: '2', title: 'Task 2', completed: true, createdAt: new Date() },
      { id: '3', title: 'Task 3', completed: false, createdAt: new Date() },
    ],
    loading: false,
    error: null,
  };

  it('should select all todos', () => {
    const result = selectAllTodos.projector(initialState);
    expect(result.length).toBe(3);
    expect(result).toEqual(initialState.todos);
  });

  it('should select pending todos only', () => {
    const result = selectPendingTodos.projector(initialState.todos);
    expect(result.length).toBe(2);
    expect(result.every((todo) => !todo.completed)).toBe(true);
  });
});
