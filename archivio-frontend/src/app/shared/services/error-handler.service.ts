import { Injectable } from '@angular/core';
import { ApiErrorHandler } from './interfaces/ApiErrorHandler';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ApiErrorHandler {
  // This function handles the error from the api calls
  handleApiError(error: HttpErrorResponse): Observable<never> {
    // Default Error Code
    let errorMessage = 'An unknown error occurred!';

    // Checking if the error is a client side error or a server side
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (typeof error.error?.message === 'string') {
      errorMessage = `Server Error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      errorMessage = `Server Error : ${error.error}`;
    } else if (typeof error.message === 'string') {
      errorMessage = error.message;
    }

    // Returning the error for the subsequent lower layers to use if needed
    return throwError(() => new Error(errorMessage));
  }
}
