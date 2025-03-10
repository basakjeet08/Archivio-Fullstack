import { Injectable } from '@angular/core';
import { BookInterface } from './interfaces/BookInterface';
import { catchError, map, Observable } from 'rxjs';
import { Book } from '../Models/Book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BookService implements BookInterface {
  // Storing the urls
  private url = 'http://localhost:8080/book';
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

  // This function calls the api to create a book object and store it
  createBook(book: {
    title: string;
    genre: string;
    description: string;
  }): Observable<Book> {
    return this.http
      .post<ResponseWrapper<Book>>(this.url, book, this.getHeaders())
      .pipe(
        map((response: ResponseWrapper<Book>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches all the books from the database
  findAllBooks(): Observable<Book[]> {
    return this.http
      .get<ResponseWrapper<Book[]>>(this.url, this.getHeaders())
      .pipe(
        map((response: ResponseWrapper<Book[]>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the book with the given id
  findBookById(id: string): Observable<Book> {
    return this.http
      .get<ResponseWrapper<Book>>(`${this.url}/${id}`, this.getHeaders())
      .pipe(
        map((response: ResponseWrapper<Book>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function updates the given book in the database
  updateBook(book: {
    id: string;
    title: string;
    genre: string;
    description: string;
  }): Observable<Book> {
    return this.http
      .patch<ResponseWrapper<Book>>(this.url, book, this.getHeaders())
      .pipe(
        map((response: ResponseWrapper<Book>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function deletes the given book from the database
  deleteById(id: string): Observable<string> {
    return this.http
      .delete<ResponseWrapper<string>>(`${this.url}/${id}`, this.getHeaders())
      .pipe(
        map((response: ResponseWrapper<string>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }
}
