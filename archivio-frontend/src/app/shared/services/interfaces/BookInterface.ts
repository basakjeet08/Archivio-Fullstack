import { Observable } from 'rxjs';
import { Book } from '../../Models/Book';

export interface BookInterface {
  createBook(book: {
    title: string;
    genre: string;
    description: string;
  }): Observable<Book>;

  findAllBooks(): Observable<Book[]>;

  findBookById(id: string): Observable<Book>;

  updateBook(book: {
    id: string;
    title: string;
    genre: string;
    description: string;
  }): Observable<Book>;

  deleteById(id: string): Observable<string>;
}
