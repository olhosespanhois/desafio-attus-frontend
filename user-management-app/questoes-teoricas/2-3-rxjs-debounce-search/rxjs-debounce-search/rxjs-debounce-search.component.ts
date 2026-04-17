import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  RxjsDebounceSearchInterface,
  RxjsDebounceSearchService,
} from './rxjs-debounce-search.service';

@Component({
  selector: 'app-rxjs-debounce-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rxjs-debounce-search.component.html',
  styleUrl: './rxjs-debounce-search.component.scss',
})
export class RxjsDebounceSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  results$: Observable<RxjsDebounceSearchInterface[]> = of([]);
  isLoading = false;
  errorMessage = '';

  private subscription: Subscription | null = null;

  constructor(private searchService: RxjsDebounceSearchService) {}

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.errorMessage = '';
          // Seta loading como true antes de iniciar a busca
          const searchTerm = this.searchControl.value || '';
          if (searchTerm.trim()) {
            this.isLoading = true;
          }
        }),
        switchMap((term) => {
          const searchTerm = term || '';
          if (!searchTerm.trim()) {
            this.isLoading = false;
            this.results$ = of([]);
            return of([]);
          }

          return this.searchService.search(searchTerm).pipe(
            catchError((error) => {
              this.errorMessage = 'Erro ao buscar resultados. Tente novamente.';
              console.error('Search error:', error);
              return of([]);
            }),
            finalize(() => {
              this.isLoading = false;
            }),
          );
        }),
      )
      .subscribe((results) => {
        this.results$ = of(results);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
