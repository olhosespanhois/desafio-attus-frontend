import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RxjsDebounceSearchComponent } from './rxjs-debounce-search.component';
import {
  RxjsDebounceSearchInterface,
  RxjsDebounceSearchService,
} from './rxjs-debounce-search.service';

describe('RxjsDebounceSearchComponent', () => {
  let component: RxjsDebounceSearchComponent;
  let fixture: ComponentFixture<RxjsDebounceSearchComponent>;
  let searchServiceMock: jest.Mocked<RxjsDebounceSearchService>;

  const mockResults: RxjsDebounceSearchInterface[] = [
    { id: 1, name: 'Test - Result 1' },
    { id: 2, name: 'Test - Result 2' },
    { id: 3, name: 'Test - Result 3' },
  ];

  beforeEach(async () => {
    searchServiceMock = {
      search: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [RxjsDebounceSearchComponent, CommonModule, ReactiveFormsModule],
      providers: [
        { provide: RxjsDebounceSearchService, useValue: searchServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsDebounceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('debounce behavior', () => {
    it('should debounce input for 500ms before searching', fakeAsync(() => {
      searchServiceMock.search.mockReturnValue(of(mockResults));

      component.searchControl.setValue('test');
      tick(300);

      expect(searchServiceMock.search).not.toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();

      tick(200);

      expect(searchServiceMock.search).toHaveBeenCalledWith('test');
      tick(0);
      expect(component.isLoading).toBeFalsy();
    }));

    it('should not search for empty string', fakeAsync(() => {
      component.searchControl.setValue('');
      tick(500);

      expect(searchServiceMock.search).not.toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();
    }));

    it('should not search for whitespace only', fakeAsync(() => {
      component.searchControl.setValue('   ');
      tick(500);

      expect(searchServiceMock.search).not.toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();
    }));
  });

  describe('race condition handling', () => {
    it('should cancel previous request when new search is made', fakeAsync(() => {
      const firstSearch$ = of(mockResults).pipe(delay(100));
      const secondSearch$ = of([{ id: 3, name: 'New - Result' }]);

      searchServiceMock.search.mockReturnValueOnce(firstSearch$);
      searchServiceMock.search.mockReturnValueOnce(secondSearch$);

      component.searchControl.setValue('first');
      tick(500);
      expect(component.isLoading).toBeTruthy();

      component.searchControl.setValue('second');
      tick(500);

      expect(searchServiceMock.search).toHaveBeenCalledTimes(2);
      expect(searchServiceMock.search).toHaveBeenCalledWith('first');
      expect(searchServiceMock.search).toHaveBeenCalledWith('second');
      tick(0);
      expect(component.isLoading).toBeFalsy();
    }));

    it('should handle distinct values to avoid duplicate searches', fakeAsync(() => {
      searchServiceMock.search.mockReturnValue(of(mockResults));

      component.searchControl.setValue('test');
      tick(500);
      component.searchControl.setValue('test');
      tick(500);

      expect(searchServiceMock.search).toHaveBeenCalledTimes(1);
    }));
  });

  describe('loading indicator', () => {
    it('should show loading indicator during search', fakeAsync(() => {
      searchServiceMock.search.mockReturnValue(
        of(mockResults).pipe(delay(100)),
      );

      component.searchControl.setValue('test');
      expect(component.isLoading).toBeFalsy();

      tick(500);
      expect(component.isLoading).toBeTruthy();

      tick(100);
      expect(component.isLoading).toBeFalsy();
    }));

    it('should not show loading for empty search', fakeAsync(() => {
      component.searchControl.setValue('');
      tick(500);
      expect(component.isLoading).toBeFalsy();
      expect(searchServiceMock.search).not.toHaveBeenCalled();
    }));
  });
  describe('error handling', () => {
    it('should handle search errors gracefully', fakeAsync(() => {
      const error = new Error('Network error');
      searchServiceMock.search.mockReturnValue(throwError(() => error));

      component.searchControl.setValue('test');
      tick(500);

      expect(component.errorMessage).toBe(
        'Erro ao buscar resultados. Tente novamente.',
      );
      expect(component.isLoading).toBeFalsy();
    }));

    it('should clear previous error on new search', fakeAsync(() => {
      searchServiceMock.search.mockReturnValueOnce(
        throwError(() => new Error('Error')),
      );
      searchServiceMock.search.mockReturnValueOnce(of(mockResults));

      component.searchControl.setValue('error');
      tick(500);
      expect(component.errorMessage).toBeTruthy();

      component.searchControl.setValue('success');
      tick(500);
      expect(component.errorMessage).toBe('');
    }));
  });

  describe('memory leak prevention', () => {
    it('should unsubscribe from observables on destroy', () => {
      expect(component['subscription']).not.toBeNull();

      const unsubscribeSpy = jest.spyOn(
        component['subscription']!,
        'unsubscribe',
      );

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
      expect(component['subscription']).toBeNull();
    });

    it('should handle destroy when subscription is null', () => {
      component['subscription'] = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('template integration', () => {
    it('should display results when observable emits', fakeAsync(() => {
      searchServiceMock.search.mockReturnValue(of(mockResults));

      component.searchControl.setValue('test');
      tick(500);
      tick(0);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const resultItems = compiled.querySelectorAll('.result-item');

      expect(resultItems.length).toBe(mockResults.length);
      expect(resultItems[0].textContent).toContain('Test - Result 1');
    }));

    it('should show loading indicator in template', fakeAsync(() => {
      searchServiceMock.search.mockReturnValue(
        of(mockResults).pipe(delay(100)),
      );

      component.searchControl.setValue('test');
      fixture.detectChanges();

      let loadingElement =
        fixture.nativeElement.querySelector('.loading-indicator');
      expect(loadingElement).toBeFalsy();

      tick(500);
      fixture.detectChanges();

      loadingElement =
        fixture.nativeElement.querySelector('.loading-indicator');
      expect(loadingElement).toBeTruthy();
      expect(loadingElement.textContent).toContain('Carregando...');

      tick(100);
      fixture.detectChanges();

      loadingElement =
        fixture.nativeElement.querySelector('.loading-indicator');
      expect(loadingElement).toBeFalsy();
    }));

    it('should show error message in template', fakeAsync(() => {
      const error = new Error('Network error');
      searchServiceMock.search.mockReturnValue(throwError(() => error));

      component.searchControl.setValue('test');
      tick(500);
      fixture.detectChanges();

      const errorElement =
        fixture.nativeElement.querySelector('.error-message');
      expect(errorElement).toBeTruthy();
      expect(errorElement.textContent).toContain('Erro ao buscar resultados');
    }));

    it('should show no results message when search returns empty array', fakeAsync(() => {
      searchServiceMock.search.mockReturnValue(of([]));

      component.searchControl.setValue('nothing');
      tick(500);
      tick(0);
      fixture.detectChanges();

      const noResultsElement =
        fixture.nativeElement.querySelector('.no-results');
      expect(noResultsElement).toBeTruthy();
      expect(noResultsElement.textContent).toContain(
        'Nenhum resultado encontrado',
      );
    }));
  });

  describe('real-time search behavior', () => {
    it('should handle rapid sequential searches correctly', fakeAsync(() => {
      const searchTerms = ['a', 'ab', 'abc', 'abcd'];
      const mockResponses = searchTerms.map((term) =>
        of([{ id: 1, name: `${term} result` }]),
      );

      searchTerms.forEach((term, index) => {
        searchServiceMock.search.mockReturnValueOnce(mockResponses[index]);
      });

      searchTerms.forEach((term) => {
        component.searchControl.setValue(term);
        tick(100);
      });

      tick(500);
      expect(searchServiceMock.search).toHaveBeenCalledTimes(1);
      expect(searchServiceMock.search).toHaveBeenCalledWith('abcd');
      tick(0);
      expect(component.isLoading).toBeFalsy();
    }));
  });
});
