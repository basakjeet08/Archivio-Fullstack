import { User } from './../../Models/User';
import { Observable } from 'rxjs';

export interface AuthInterface {
  getUser(): User | undefined;

  getUserFromLocal(): User | undefined;

  getUserSubject(): Observable<User | undefined>;

  setUserInLocal(user: User): void;

  login(user: { email: string; password: string }): Observable<User>;

  registerLibrarian(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<User>;

  registerMember(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<User>;

  logout(): void;
}
