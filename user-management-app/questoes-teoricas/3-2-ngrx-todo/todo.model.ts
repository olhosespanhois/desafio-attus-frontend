export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialTodoState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};
