import { Observable } from 'rxjs';
import { BookRequest, Status } from '../../Models/BookRequest';

export interface BookRequestInterface {
  createBookRequest(bookRequest: {
    id: string;
    bookId: string;
  }): Observable<BookRequest>;

  findAll(): Observable<BookRequest[]>;

  findByRequesterEmail(): Observable<BookRequest[]>;

  findByRequesterEmailAndStatus(status: Status): Observable<BookRequest[]>;

  findById(id: string): Observable<BookRequest>;

  approveBookRequest(bookRequest: {
    id: string;
    bookId: string;
  }): Observable<BookRequest>;

  returnBookRequest(bookRequest: {
    id: string;
    bookId: string;
  }): Observable<BookRequest>;
}
