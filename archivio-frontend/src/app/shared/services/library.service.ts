import { Injectable } from '@angular/core';
import { LibraryInterface } from './interfaces/LibraryInterface';
import { catchError, map, Observable } from 'rxjs';
import { User } from '../Models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LibraryService implements LibraryInterface {
  // Storing the URLS , endpoints
  private url = 'http://localhost:8080/librarian';
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {
    this.token = authService.getLoggedInUser()?.token || 'Invalid Token';
  }

  // This function fetches all the librarians data
  fetchAll(): Observable<User[]> {
    return this.http
      .get<ResponseWrapper<User[]>>(this.url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      })
      .pipe(
        map((response: ResponseWrapper<User[]>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function updates the librarian by the given id
  update(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .patch<ResponseWrapper<User>>(this.url, user, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      })
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function deletes the librarian by the given id
  deleteById(id: string): Observable<string> {
    return this.http
      .delete<ResponseWrapper<string>>(`${this.url}/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      })
      .pipe(
        map((response: ResponseWrapper<string>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }
}
