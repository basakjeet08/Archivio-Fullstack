import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { catchError, map, Observable } from 'rxjs';
import { BookRequest } from '../Models/BookRequest';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import { AuthService } from './auth.service';
import { BookRequestInterface } from './interfaces/BookRequestInterface';

@Injectable({ providedIn: 'root' })
export class BookRequestService implements BookRequestInterface {
  // This is the provided URL and tokens
  private url = 'http://localhost:8080/book/request';
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    authService: AuthService
  ) {
    // Storing the token in the variable
    this.token = authService.getUser()?.token || 'Invalid Token';

    // Subscribing to the user changes
    authService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This function creates the headers required
  private getHeaders() {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    };
  }

  // This function requests the API to create a book request
  createBookRequest(bookRequest: {
    id: string;
    bookId: string;
  }): Observable<BookRequest> {
    return this.http
      .post<ResponseWrapper<BookRequest>>(
        `${this.url}/requested`,
        bookRequest,
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the book request according to the given id
  findById(id: string): Observable<BookRequest> {
    return this.http
      .get<ResponseWrapper<BookRequest>>(`${this.url}/${id}`, this.getHeaders())
      .pipe(
        map((response: ResponseWrapper<BookRequest>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function requests the API to approve a book request
  approveBookRequest(bookRequest: {
    id: string;
    bookId: string;
  }): Observable<BookRequest> {
    return this.http
      .patch<ResponseWrapper<BookRequest>>(
        `${this.url}/approve`,
        bookRequest,
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function requests the API to return the book in a book request
  returnBookRequest(bookRequest: {
    id: string;
    bookId: string;
  }): Observable<BookRequest> {
    return this.http
      .patch<ResponseWrapper<BookRequest>>(
        `${this.url}/return`,
        bookRequest,
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }
}
