import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  RxjsDebounceSearchService,
  SearchResult,
} from './rxjs-debounce-search.service';

@Component({
  selector: 'app-rxjs-debounce-search',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-debounce-search.component.html',
  styleUrl: './rxjs-debounce-search.component.scss',
})
export class RxjsDebounceSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  searchResults$: Observable<SearchResult[]>;
  isLoading = false;
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(private searchService: RxjsDebounceSearchService) {
    this.searchResults$ = this.setupSearchStream();
  }

  ngOnInit(): void {
    // Configuração adicional se necessário
  }

  private setupSearchStream(): Observable<SearchResult[]> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.errorMessage = '';
      }),
      switchMap((searchTerm) => {
        if (!searchTerm || searchTerm.trim().length === 0) {
          this.isLoading = false;
          return of([]);
        }

        return this.searchService.search(searchTerm.trim()).pipe(
          catchError((error) => {
            this.errorMessage = 'Erro ao buscar resultados. Tente novamente.';
            console.error('Search error:', error);
            return of([]);
          }),
        );
      }),
      tap(() => {
        this.isLoading = false;
      }),
      takeUntil(this.destroy$),
    );
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
