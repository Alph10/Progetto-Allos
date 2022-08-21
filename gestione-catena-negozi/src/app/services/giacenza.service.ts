import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Giacenza } from '../models/Giacenza';

@Injectable({
  providedIn: 'root'
})
export class GiacenzaService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:8000/api/giacenze';
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

  getGiacenze(): Observable<Giacenza[]> {
    return this.httpClient.get<Giacenza[]>(this.baseUrl, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  getGiacenzeNegozio(id_negozio: number): Observable<Giacenza[]> {
    return this.httpClient.get<Giacenza[]>(this.baseUrl + '-negozio/' + id_negozio, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  getGiacenza(id_giacenza: number): Observable<Giacenza> {
    return this.httpClient.get<Giacenza>(this.baseUrl + '/' + id_giacenza, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  postGiacenza(giacenza: Giacenza): Observable<Giacenza> {
    return this.httpClient.post<Giacenza>(this.baseUrl, giacenza, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  putGiacenza(giacenza: Giacenza, id_giacenza: number): Observable<Giacenza> {
    return this.httpClient.put<Giacenza>(this.baseUrl + '/' + id_giacenza, giacenza, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  deleteGiacenza(id_giacenza: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/' + id_giacenza, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }
}
