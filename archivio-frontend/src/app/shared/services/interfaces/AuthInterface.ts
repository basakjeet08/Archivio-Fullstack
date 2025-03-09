import { Roles } from '../../Models/Roles';
import { User } from './../../Models/User';
import { Observable } from 'rxjs';

export interface AuthInterface {
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

  storeLoggedInUser(user: User): void;

  getLoggedInUser(): User | undefined;

  getUserRole(): Roles | undefined;

  logout(): void;
}
