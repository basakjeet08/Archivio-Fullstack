import { BookStats } from './BookStats';
import { LibrarianStats } from './LibrarianStats';
import { MemberStats } from './MemberStats';

export class StatsDao {
  constructor(
    readonly bookStats: BookStats,
    readonly memberStats: MemberStats,
    readonly librarianStats: LibrarianStats
  ) {}
}
