import { Injectable } from '@angular/core';
import { LibraryInterface } from './interfaces/LibraryInterface';
import { catchError, map, Observable } from 'rxjs';
import { User } from '../Models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import { AuthService } from './auth.service';
import {
  DELETE_LIBRARIAN_BY_ID_ENDPOINT,
  FETCH_ALL_LIBRARIAN_ENDPOINT,
  FETCH_LIBRARIAN_BY_ID_ENDPOINT,
  UPDATE_LIBRARIAN_ENDPOINT,
} from '../constants/url-constants';

@Injectable({ providedIn: 'root' })
export class LibraryService implements LibraryInterface {
  // Storing the URLS , endpoints
  private token: string;

  // Injecting the necessary dependencies
  constructor(
    private http: HttpClient,
    authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {
    // Storing the token in the variable
    this.token = authService.getUser()?.token || 'Invalid Token';

    // Subscribing to the user changes
    authService.getUserSubject().subscribe({
      next: (user) => (this.token = user?.token || 'Invalid Token'),
    });
  }

  // This function adds the required headers to the api calls
  private addHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  // This function fetches all the librarians data
  fetchAll(): Observable<User[]> {
    return this.http
      .get<ResponseWrapper<User[]>>(
        FETCH_ALL_LIBRARIAN_ENDPOINT,
        this.addHeader()
      )
      .pipe(
        map((response: ResponseWrapper<User[]>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the librarian data with the given id
  fetchById(id: string): Observable<User> {
    return this.http
      .get<ResponseWrapper<User>>(
        FETCH_LIBRARIAN_BY_ID_ENDPOINT.replace(':id', id),
        this.addHeader()
      )
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
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
      .patch<ResponseWrapper<User>>(
        UPDATE_LIBRARIAN_ENDPOINT,
        user,
        this.addHeader()
      )
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function deletes the librarian by the given id
  deleteById(id: string): Observable<string> {
    return this.http
      .delete<ResponseWrapper<string>>(
        DELETE_LIBRARIAN_BY_ID_ENDPOINT.replace(':id', id),
        this.addHeader()
      )
      .pipe(
        map((response: ResponseWrapper<string>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }
}
