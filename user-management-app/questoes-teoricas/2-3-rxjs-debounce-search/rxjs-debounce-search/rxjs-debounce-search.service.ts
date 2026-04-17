// services/search.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface SearchResult {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class RxjsDebounceSearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<SearchResult[]> {
    // Simulando uma requisição HTTP com delay
    if (!term.trim()) {
      return of([]);
    }

    // Exemplo real: return this.http.get<SearchResult[]>(`/api/search?q=${term}`);
    return this.http
      .get<
        SearchResult[]
      >(`https://jsonplaceholder.typicode.com/posts?q=${term}`)
      .pipe(delay(300)); // Simulando latência de rede
  }
}
