import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface RxjsDebounceSearchInterface {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class RxjsDebounceSearchService {
  search(term: string): Observable<RxjsDebounceSearchInterface[]> {
    // Simulando uma requisição HTTP com delay
    if (!term.trim()) {
      return of([]);
    }

    // Mock para demonstração
    const mockResults: RxjsDebounceSearchInterface[] = [
      { id: 1, name: `${term} - Result 1` },
      { id: 2, name: `${term} - Result 2` },
      { id: 3, name: `${term} - Result 3` },
    ];

    return of(mockResults).pipe(delay(800)); // Simula delay da rede
  }
}
