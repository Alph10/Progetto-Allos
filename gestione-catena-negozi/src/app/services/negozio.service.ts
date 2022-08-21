import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Negozio } from '../models/Negozio';

@Injectable({
  providedIn: 'root'
})
export class NegozioService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:8000/api/negozi';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("C'è stato qualche errore lato client: " + error.message)
    }
    else {
      console.error("C'è stato qualche errore lato server: " + error.message)
    }
    return throwError(() => new Error('C\'è stato un errore. Riprova!'));
  }

  getNegozi(): Observable<Negozio[]> {
    return this.httpClient.get<Negozio[]>(this.baseUrl, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  getNegozio(id_negozio: number): Observable<Negozio> {
    return this.httpClient.get<Negozio>(this.baseUrl + '/' + id_negozio, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  postNegozio(negozio: Negozio): Observable<Negozio> {
    return this.httpClient.post<Negozio>(this.baseUrl, negozio, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  putNegozio(negozio: Negozio, id_negozio: number): Observable<Negozio> {
    return this.httpClient.put<Negozio>(this.baseUrl + '/' + id_negozio, negozio, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  deleteNegozio(id_negozio: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/' + id_negozio, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }
}
