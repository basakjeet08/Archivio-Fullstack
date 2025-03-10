import { Time } from '@angular/common';
import { Book } from './Book';
import { User } from './User';

export enum Status {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  RETURNED = 'RETURNED',
}

export class BookRequest {
  constructor(
    readonly id: string,
    readonly requestedDate: Time,
    readonly approvedDate: Time,
    readonly returnDate: Time,
    readonly status: Status,
    readonly book: Book,
    readonly requester: User,
    readonly approvedBy: User
  ) {}
}
