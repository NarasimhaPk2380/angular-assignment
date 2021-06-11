import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { book } from '@buyonline/shared/data-access/models';

import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private apiService: ApiService, private utilSrvc: UtilsService) {}

  // API calls invoking
  searchBooks(searchText$: Observable<string>): Observable<Array<book>> {
    return searchText$.pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tap((_) =>
        this.utilSrvc.appSubject$.next({
          type: 'spinner',
          value: true,
        })
      ),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchText) =>
        searchText
          ? this.apiService.apiRequest('GET', {}, { q: searchText }).pipe(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              tap((_) =>
                this.utilSrvc.appSubject$.next({
                  type: 'spinner',
                  value: false,
                })
              ),
              map((booksJson) => booksJson.items as Array<book>)
            )
          : of([])
      )
    );
  }

  retrieveBookId(bookId: string): Observable<book> {
    return this.apiService
      .apiRequest('GET', { id: bookId }, {})
      .pipe(map((booksJson) => booksJson as book));
  }
}
