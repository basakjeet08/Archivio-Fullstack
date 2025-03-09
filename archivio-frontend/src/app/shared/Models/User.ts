import { Roles } from './Roles';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly role: Roles,
    readonly token: string,
    readonly refreshToken: string
  ) {}
}
