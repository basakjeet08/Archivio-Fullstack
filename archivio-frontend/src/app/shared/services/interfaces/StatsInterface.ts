import { Observable } from 'rxjs';
import { StatsDao } from '../../Models/stats/StatsDao';

export interface StatsInterface {
  fetchLibrarianStats(): Observable<StatsDao>;

  fetchMemberStats(): Observable<StatsDao>;
}
