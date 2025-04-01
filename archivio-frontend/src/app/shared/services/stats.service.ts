import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { StatsInterface } from './interfaces/StatsInterface';
import { catchError, map, Observable } from 'rxjs';
import { StatsDao } from '../Models/stats/StatsDao';
import { AuthService } from './auth.service';
import { ResponseWrapper } from '../Models/ResponseWrapper';
import {
  FETCH_ADMIN_STATS_ENDPOINT,
  FETCH_LIBRARIAN_STATS_ENDPOINT,
  FETCH_MEMBER_STATS_ENDPOINT,
} from '../constants/url-constants';

@Injectable({ providedIn: 'root' })
export class StatsService implements StatsInterface {
  // This is the provided URL and tokens
  private url = 'http://localhost:8080/stats';
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

  // This function fetches the dashboard stats for the admins
  fetchAdminStats(): Observable<StatsDao> {
    return this.http
      .get<ResponseWrapper<StatsDao>>(
        FETCH_ADMIN_STATS_ENDPOINT,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the dashboard stats for the librarians
  fetchLibrarianStats(): Observable<StatsDao> {
    return this.http
      .get<ResponseWrapper<StatsDao>>(
        FETCH_LIBRARIAN_STATS_ENDPOINT,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }

  // This function fetches the dashboard stats for the members
  fetchMemberStats(): Observable<StatsDao> {
    return this.http
      .get<ResponseWrapper<StatsDao>>(
        FETCH_MEMBER_STATS_ENDPOINT,
        this.getHeaders()
      )
      .pipe(
        map((response) => response.data),
        catchError(this.errorHandler.handleApiError)
      );
  }
}
