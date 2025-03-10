import { Observable } from 'rxjs';
import { User } from '../../Models/User';

export interface LibraryInterface {
  fetchAll(): Observable<User[]>;

  update(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<User>;

  deleteById(id: string): Observable<string>;
}
