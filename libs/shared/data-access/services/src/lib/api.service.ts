//  It is to make http calls from any place of application
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Injects into root application , no need to import in app module
})
export class ApiService {
  baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  apiRequest(
    method: string, // Method of request
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    let url;
    if (body?.id) {
      url = `${this.baseUrl}/${body.id}`;
    } else {
      url = this.baseUrl;
    }
    let availparams = new HttpParams();
    for (const key in params) {
      availparams = availparams.append(key, params[key]);
    }
    return this.http
      .request(method, url, {
        body,
        params: availparams,
      })
      .pipe(
        catchError((err) => {
          // console.log('Error occurred', err);
          return throwError(err);
        })
      );
  }
}
