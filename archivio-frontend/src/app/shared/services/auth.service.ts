import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInterface } from './interfaces/AuthInterface';
import { catchError, map, Observable, tap } from 'rxjs';
import { Roles } from '../Models/Roles';
import { User } from '../Models/User';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthInterface {
  // API URLs and Local storage Tokens
  private URL = 'http://localhost:8080';
  private USER_DATA_TOKEN = 'USER_DATA';

  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  // This function logs in the user and returns the user observable
  login(user: { email: string; password: string }): Observable<User> {
    return this.http
      .post<ResponseWrapper<User>>(`${this.URL}/login`, user)
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
        tap((user: User) => this.storeLoggedInUser(user)),
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
      .post<ResponseWrapper<User>>(`${this.URL}/register/librarian`, user, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getLoggedInUser()?.token}`,
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
      .post<ResponseWrapper<User>>(`${this.URL}/register/member`, user)
      .pipe(
        map((response: ResponseWrapper<User>) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function stores the user data to the local storage
  storeLoggedInUser(user: User): void {
    localStorage.setItem(this.USER_DATA_TOKEN, JSON.stringify(user));
  }

  // This function returns the current stored user in the local storage
  getLoggedInUser(): User | undefined {
    const data = localStorage.getItem(this.USER_DATA_TOKEN);
    if (!data) return undefined;

    return JSON.parse(data);
  }

  // This function returns the current logged in user role
  getUserRole(): Roles | undefined {
    return this.getLoggedInUser()?.role;
  }

  // This function logs out the user
  logout(): void {
    localStorage.removeItem(this.USER_DATA_TOKEN);
  }
}
