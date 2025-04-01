import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { catchError, map, Observable } from 'rxjs';
import { BookRequest, Status } from '../Models/BookRequest';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import { AuthService } from './auth.service';
import { BookRequestInterface } from './interfaces/BookRequestInterface';
import {
  APPROVE_BOOK_REQUEST_ENDPOINT,
  CREATE_BOOK_REQUEST_ENDPOINT,
  FETCH_ALL_BOOK_REQUEST_ENDPOINT,
  FETCH_BOOK_REQUEST_BY_USER_ENDPOINT,
  FETCH_REQUEST_BY_EMAIL_AND_STATUS_ENDPOINT,
  FETCH_REQUEST_BY_ID_ENDPOINT,
  RETURN_BOOK_REQUEST_ENDPOINT,
} from '../constants/url-constants';

@Injectable({ providedIn: 'root' })
export class BookRequestService implements BookRequestInterface {
  // This is the provided URL and tokens
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
        CREATE_BOOK_REQUEST_ENDPOINT,
        bookRequest,
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches all the book requests created
  findAll(): Observable<BookRequest[]> {
    return this.http
      .get<ResponseWrapper<BookRequest[]>>(
        FETCH_ALL_BOOK_REQUEST_ENDPOINT,
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest[]>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the book requests of the current logged in user
  findByRequesterEmail(): Observable<BookRequest[]> {
    return this.http
      .get<ResponseWrapper<BookRequest[]>>(
        FETCH_BOOK_REQUEST_BY_USER_ENDPOINT,
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest[]>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the book requests of the current logged in user and the book request status wanted
  findByRequesterEmailAndStatus(status: Status): Observable<BookRequest[]> {
    return this.http
      .get<ResponseWrapper<BookRequest[]>>(
        FETCH_REQUEST_BY_EMAIL_AND_STATUS_ENDPOINT.replace(':status', status),
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest[]>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the book request according to the given id
  findById(id: string): Observable<BookRequest> {
    return this.http
      .get<ResponseWrapper<BookRequest>>(
        FETCH_REQUEST_BY_ID_ENDPOINT.replace(':id', id),
        this.getHeaders()
      )
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
        APPROVE_BOOK_REQUEST_ENDPOINT,
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
        RETURN_BOOK_REQUEST_ENDPOINT,
        bookRequest,
        this.getHeaders()
      )
      .pipe(
        map((response: ResponseWrapper<BookRequest>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }
}
