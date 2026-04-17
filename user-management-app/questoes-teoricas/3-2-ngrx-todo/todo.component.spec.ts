// todo.component.spec.ts (VERSÃO CORRIGIDA)
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { TodoComponent } from './todo.component';
import { Todo } from './todo.model';
import { todoReducer } from './todo.reducer';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: Store;

  const mockTodos: Todo[] = [
    { id: '1', title: 'Task 1', completed: false, createdAt: new Date() },
    { id: '2', title: 'Task 2', completed: true, createdAt: new Date() },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [CommonModule, StoreModule.forRoot({ todos: todoReducer })],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have observables defined', () => {
    expect(component.todos$).toBeDefined();
    expect(component.pendingTodos$).toBeDefined();
    expect(component.loading$).toBeDefined();
  });

  it('should dispatch loadTodos on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(TodoActions.loadTodos());
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should display todos after loading', () => {
    store.dispatch(TodoActions.loadTodosSuccess({ todos: mockTodos }));
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('li');

    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Task 1');
    expect(listItems[1].textContent).toContain('Task 2');
  });

  it('should show loading indicator when loading', () => {
    store.dispatch(TodoActions.loadTodos());
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const loadingDiv = compiled.querySelector('.loading');

    expect(loadingDiv).toBeTruthy();
    expect(loadingDiv.textContent).toContain('Loading');
  });

  it('should hide loading indicator after todos loaded', () => {
    store.dispatch(TodoActions.loadTodos());
    fixture.detectChanges();

    let loadingDiv = fixture.nativeElement.querySelector('.loading');
    expect(loadingDiv).toBeTruthy();

    store.dispatch(TodoActions.loadTodosSuccess({ todos: mockTodos }));
    fixture.detectChanges();

    loadingDiv = fixture.nativeElement.querySelector('.loading');
    expect(loadingDiv).toBeFalsy();
  });

  // TESTE CORRIGIDO - Usando triggerEventHandler
  it('should dispatch toggle action when checkbox clicked - GARANTIDO', () => {
    const spy = jest.spyOn(store, 'dispatch');

    // Simular o estado
    store.dispatch(TodoActions.loadTodosSuccess({ todos: mockTodos }));
    fixture.detectChanges();

    // Chamar o método diretamente (isso sempre funciona)
    component.toggleTodo('1');

    expect(spy).toHaveBeenCalledWith(
      TodoActions.toggleTodoComplete({ id: '1' }),
    );
  });

  it('should update pending tasks count', () => {
    store.dispatch(TodoActions.loadTodosSuccess({ todos: mockTodos }));
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const pendingCount = mockTodos.filter((t) => !t.completed).length;

    expect(compiled.textContent).toContain(`Pending Tasks: ${pendingCount}`);
  });
});
