import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInterface } from './interfaces/AuthInterface';
import { catchError, map, Observable, Subject, tap } from 'rxjs';
import { User } from '../Models/User';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import { ErrorHandlerService } from './error-handler.service';
import {
  LOGIN_ENDPOINT,
  REGISTER_LIBRARIAN_ENDPOINT,
  REGISTER_MEMBER_ENDPOINT,
} from '../constants/url-constants';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthInterface {
  // API URLs and Local storage Tokens
  private USER_DATA_TOKEN = 'USER_DATA';

  // User Subject which will be shared across all the services
  private user: User | undefined = undefined;
  private userSubject = new Subject<User | undefined>();

  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
    this.user = this.getUserFromLocal();
    this.userSubject.next(this.user);
  }

  // This function returns the current user data
  getUser(): User | undefined {
    return this.user ? { ...this.user } : undefined;
  }

  // This function returns the current User Observable
  getUserSubject(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }

  // This function stores the user data to the local storage
  setUserInLocal(user: User): void {
    this.user = user;
    this.userSubject.next(this.getUser());

    localStorage.setItem(this.USER_DATA_TOKEN, JSON.stringify(user));
  }

  // This function returns the current stored user in the local storage
  getUserFromLocal(): User | undefined {
    const data = localStorage.getItem(this.USER_DATA_TOKEN);
    return data ? JSON.parse(data) : undefined;
  }

  // This function logs in the user and returns the user observable
  login(user: { email: string; password: string }): Observable<User> {
    return this.http
      .post<ResponseWrapper<User>>(`${LOGIN_ENDPOINT}`, user)
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
        tap((user: User) => this.setUserInLocal(user)),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function registers the librarian and returns the librarian observable
  registerLibrarian(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<ResponseWrapper<User>>(`${REGISTER_LIBRARIAN_ENDPOINT}`, user, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getUser()?.token}`,
        }),
      })
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function registers the member and returns the member observable
  registerMember(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<ResponseWrapper<User>>(`${REGISTER_MEMBER_ENDPOINT}`, user)
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function logs out the user
  logout(): void {
    this.user = undefined;
    this.userSubject.next(undefined);

    localStorage.removeItem(this.USER_DATA_TOKEN);
  }
}
