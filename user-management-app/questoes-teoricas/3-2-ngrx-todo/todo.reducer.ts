import { createReducer, on } from '@ngrx/store';
import {
    loadTodos,
    loadTodosError,
    loadTodosSuccess,
    toggleTodoComplete,
} from './todo.actions';
import { TodoState, initialTodoState } from './todo.model';

export const todoReducer = createReducer(
  initialTodoState,

  on(
    loadTodos,
    (state): TodoState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),

  on(
    loadTodosSuccess,
    (state, { todos }): TodoState => ({
      ...state,
      todos,
      loading: false,
      error: null,
    }),
  ),

  on(
    loadTodosError,
    (state, { error }): TodoState => ({
      ...state,
      loading: false,
      error,
    }),
  ),

  on(
    toggleTodoComplete,
    (state, { id }): TodoState => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }),
  ),
);
