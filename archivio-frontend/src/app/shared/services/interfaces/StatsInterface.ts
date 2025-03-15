import { Observable } from 'rxjs';
import { StatsDao } from '../../Models/stats/StatsDao';

export interface StatsInterface {
  fetchAdminStats(): Observable<StatsDao>;

  fetchLibrarianStats(): Observable<StatsDao>;

  fetchMemberStats(): Observable<StatsDao>;
}
