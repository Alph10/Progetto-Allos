import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Dipendente } from '../models/Dipendente';

@Injectable({
  providedIn: 'root'
})
export class DipendenteService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:8000/api/dipendenti';
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

  getDipendenti(): Observable<Dipendente[]> {
    return this.httpClient.get<Dipendente[]>(this.baseUrl, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  getDipendentiNegozio(id_negozio: number): Observable<Dipendente[]> {
    return this.httpClient.get<Dipendente[]>(this.baseUrl + '-negozio/' + id_negozio, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  getDipendente(id_dipendente: number): Observable<Dipendente> {
    return this.httpClient.get<Dipendente>(this.baseUrl + '/' + id_dipendente, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  postDipendente(dipendente: Dipendente): Observable<Dipendente> {
    return this.httpClient.post<Dipendente>(this.baseUrl, dipendente, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  putDipendente(dipendente: Dipendente, id_dipendente: number): Observable<Dipendente> {
    return this.httpClient.put<Dipendente>(this.baseUrl + '/' + id_dipendente, dipendente, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  deleteDipendente(id_dipendente: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/' + id_dipendente, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }
}
