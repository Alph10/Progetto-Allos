import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Articolo } from '../models/Articolo';

@Injectable({
  providedIn: 'root'
})
export class ArticoloService {

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:8000/api/articoli';
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

  getArticoli(): Observable<Articolo[]> {
    return this.httpClient.get<Articolo[]>(this.baseUrl, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  getArticolo(id_articolo: number): Observable<Articolo> {
    return this.httpClient.get<Articolo>(this.baseUrl + '/' + id_articolo, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  postArticolo(articolo: Articolo): Observable<Articolo> {
    return this.httpClient.post<Articolo>(this.baseUrl, articolo, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  putArticolo(articolo: Articolo, id_articolo: number): Observable<Articolo> {
    return this.httpClient.put<Articolo>(this.baseUrl + '/' + id_articolo, articolo, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  deleteArticolo(id_articolo: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/' + id_articolo, { headers: this.headers }).pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }
}
