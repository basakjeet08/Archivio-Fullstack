import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiErrorHandler {
  handleApiError(error: HttpErrorResponse): Observable<never>;
}
