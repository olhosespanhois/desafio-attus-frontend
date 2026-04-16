import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhoComponent } from './carrinho.component';

describe('CarrinhoComponent', () => {
  let component: CarrinhoComponent;
  let fixture: ComponentFixture<CarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should have one item in the cart initially', () => {
      expect(component.items().length).toBe(1);
      expect(component.items()[0]).toEqual({
        id: 1,
        nome: 'Produto',
        preco: 10,
        quantidade: 1,
      });
    });

    it('should calculate total correctly for initial state', () => {
      expect(component.total()).toBe(10); // 10 * 1 = 10
    });
  });

  describe('adicionarItem()', () => {
    it('should increase quantity of the existing item by 1', () => {
      component.adicionarItem();

      expect(component.items().length).toBe(1);
      expect(component.items()[0].quantidade).toBe(2);
      expect(component.total()).toBe(20); // 10 * 2 = 20
    });

    it('should update total correctly after multiple additions', () => {
      component.adicionarItem(); // quantidade: 2, total: 20
      component.adicionarItem(); // quantidade: 3, total: 30
      component.adicionarItem(); // quantidade: 4, total: 40

      expect(component.items()[0].quantidade).toBe(4);
      expect(component.total()).toBe(40);
    });
  });

  describe('removerItem()', () => {
    it('should decrease quantity of the existing item by 1', () => {
      component.removerItem();

      expect(component.items().length).toBe(0);
      expect(component.total()).toBe(0);
    });

    it('should not go below zero quantity', () => {
      component.removerItem(); // quantidade becomes 0 and item is removed
      component.removerItem(); // should have no effect

      expect(component.items().length).toBe(0);
      expect(component.total()).toBe(0);
    });

    it('should remove item when quantity reaches zero', () => {
      // First, add to make quantity 2
      component.adicionarItem(); // quantidade: 2
      component.removerItem(); // quantidade: 1

      expect(component.items().length).toBe(1);
      expect(component.items()[0].quantidade).toBe(1);

      component.removerItem(); // quantidade: 0, item removed

      expect(component.items().length).toBe(0);
      expect(component.total()).toBe(0);
    });

    it('should handle remove when cart is empty', () => {
      component.removerItem(); // remove initial item
      component.removerItem(); // try to remove again

      expect(component.items().length).toBe(0);
      expect(component.total()).toBe(0);
    });
  });

  describe('totalChange Output', () => {
    let emittedValues: number[];

    beforeEach(() => {
      emittedValues = [];
      component.totalChange.subscribe((value) => emittedValues.push(value));
    });

    it('should emit totalChange when total changes', () => {
      component.adicionarItem(); // total changes from 10 to 20

      expect(emittedValues).toEqual([20]);
    });

    it('should emit totalChange for each change', () => {
      component.adicionarItem(); // 10 -> 20
      component.adicionarItem(); // 20 -> 30
      component.removerItem(); // 30 -> 20

      expect(emittedValues).toEqual([20, 30, 20]);
    });

    it('should not emit totalChange when total remains the same', () => {
      component.removerItem(); // 10 -> 0
      emittedValues = []; // clear emissions
      component.removerItem(); // 0 -> 0 (no change)

      expect(emittedValues).toEqual([]);
    });

    it('should emit correct total values after multiple operations', () => {
      component.adicionarItem(); // total: 20
      component.adicionarItem(); // total: 30
      component.removerItem(); // total: 20
      component.adicionarItem(); // total: 30

      expect(emittedValues).toEqual([20, 30, 20, 30]);
    });

    it('should emit zero when cart becomes empty', () => {
      component.removerItem(); // total becomes 0

      expect(emittedValues).toEqual([0]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple items correctly', () => {
      // Add more items to test multiple items scenario
      // Note: The current implementation only handles one item
      // This test documents current behavior

      component.adicionarItem(); // quantidade: 2
      expect(component.items().length).toBe(1);
      expect(component.total()).toBe(20);
    });

    it('should maintain immutability of items signal', () => {
      const originalItems = component.items();
      component.adicionarItem();

      // Original reference should be different after update
      expect(component.items()).not.toBe(originalItems);
    });
  });

  describe('Template Integration', () => {
    it('should display total correctly in the template', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('div div').textContent).toContain(
        'Total: R$ 10',
      );

      component.adicionarItem();
      fixture.detectChanges();

      expect(compiled.querySelector('div div').textContent).toContain(
        'Total: R$ 20',
      );
    });

    it('should have working buttons', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('button:first-of-type');
      const removeButton = compiled.querySelector('button:last-of-type');

      expect(addButton.textContent).toContain('+');
      expect(removeButton.textContent).toContain('-');

      addButton.click();
      fixture.detectChanges();

      expect(compiled.querySelector('div div').textContent).toContain(
        'Total: R$ 20',
      );

      removeButton.click();
      fixture.detectChanges();

      expect(compiled.querySelector('div div').textContent).toContain(
        'Total: R$ 10',
      );
    });
  });
});
