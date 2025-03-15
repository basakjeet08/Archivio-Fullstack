import { BookStats } from './BookStats';
import { MemberStats } from './MemberStats';

export class StatsDao {
  constructor(
    readonly bookStats: BookStats,
    readonly memberStats: MemberStats
  ) {}
}
