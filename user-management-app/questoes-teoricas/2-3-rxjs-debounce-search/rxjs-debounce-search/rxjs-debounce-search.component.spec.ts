import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RxjsDebounceSearchComponent } from './rxjs-debounce-search.component';
import { RxjsDebounceSearchService } from './rxjs-debounce-search.service';

describe('RxjsDebounceSearchComponent', () => {
  let component: RxjsDebounceSearchComponent;
  let fixture: ComponentFixture<RxjsDebounceSearchComponent>;
  let RxjsDebounceSearchService: jest.Mocked<RxjsDebounceSearchService>;

  const mockResults = [
    { id: 1, name: 'Result 1', description: 'Description 1' },
    { id: 2, name: 'Result 2', description: 'Description 2' },
  ];

  beforeEach(async () => {
    const RxjsDebounceSearchServiceMock = {
      search: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RxjsDebounceSearchComponent],
      providers: [
        {
          provide: RxjsDebounceSearchService,
          useValue: RxjsDebounceSearchServiceMock,
        },
      ],
    }).compileComponents();

    RxjsDebounceSearchService = TestBed.inject(
      RxjsDebounceSearchService,
    ) as jest.Mocked<RxjsDebounceSearchService>;
    fixture = TestBed.createComponent(RxjsDebounceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search control', () => {
    expect(component.searchControl.value).toBe('');
    expect(component.isLoading).toBe(false);
  });

  it('should debounce search input', (done) => {
    jest.useFakeTimers();
    RxjsDebounceSearchService.search.mockReturnValue(of(mockResults));

    component.searchControl.setValue('test');

    expect(RxjsDebounceSearchService.search).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(true);

    jest.advanceTimersByTime(500);

    setTimeout(() => {
      expect(RxjsDebounceSearchService.search).toHaveBeenCalledWith('test');
      done();
    }, 0);

    jest.useRealTimers();
  });

  it('should cancel previous request when new search is made', (done) => {
    jest.useFakeTimers();

    const firstSearch$ = of(mockResults);
    const secondSearch$ = of([
      { id: 3, name: 'Result 3', description: 'Description 3' },
    ]);

    RxjsDebounceSearchService.search
      .mockReturnValueOnce(firstSearch$)
      .mockReturnValueOnce(secondSearch$);

    // First search
    component.searchControl.setValue('first');
    jest.advanceTimersByTime(500);

    // Second search before first completes
    component.searchControl.setValue('second');
    jest.advanceTimersByTime(500);

    // Only the last search should be executed
    setTimeout(() => {
      expect(RxjsDebounceSearchService.search).toHaveBeenCalledTimes(2);
      expect(RxjsDebounceSearchService.search).toHaveBeenLastCalledWith(
        'second',
      );
      done();
    }, 0);

    jest.useRealTimers();
  });

  it('should show loading indicator during request', (done) => {
    jest.useFakeTimers();

    RxjsDebounceSearchService.search.mockReturnValue(of(mockResults));

    component.searchControl.setValue('test');
    jest.advanceTimersByTime(500);

    expect(component.isLoading).toBe(true);

    setTimeout(() => {
      expect(component.isLoading).toBe(false);
      done();
    }, 0);

    jest.useRealTimers();
  });

  it('should handle empty search term', (done) => {
    jest.useFakeTimers();

    component.searchControl.setValue('');
    jest.advanceTimersByTime(500);

    setTimeout(() => {
      expect(RxjsDebounceSearchService.search).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      done();
    }, 0);

    jest.useRealTimers();
  });

  it('should handle search error', (done) => {
    jest.useFakeTimers();

    RxjsDebounceSearchService.search.mockReturnValue(
      throwError(() => new Error('Network error')),
    );

    component.searchControl.setValue('test');
    jest.advanceTimersByTime(500);

    setTimeout(() => {
      expect(component.errorMessage).toBe(
        'Erro ao buscar resultados. Tente novamente.',
      );
      expect(component.isLoading).toBe(false);
      done();
    }, 0);

    jest.useRealTimers();
  });

  it('should clear search input', () => {
    component.searchControl.setValue('test value');
    expect(component.searchControl.value).toBe('test value');

    component.clearSearch();
    expect(component.searchControl.value).toBe('');
  });

  it('should unsubscribe on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should handle distinctUntilChanged correctly', (done) => {
    jest.useFakeTimers();

    RxjsDebounceSearchService.search.mockReturnValue(of(mockResults));

    component.searchControl.setValue('test');
    jest.advanceTimersByTime(500);

    component.searchControl.setValue('test');
    jest.advanceTimersByTime(500);

    setTimeout(() => {
      // Should only be called once for identical values
      expect(RxjsDebounceSearchService.search).toHaveBeenCalledTimes(1);
      done();
    }, 0);

    jest.useRealTimers();
  });
});
