import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatsDao } from 'src/app/shared/Models/stats/StatsDao';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Injecting the necessary dependencies
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {}

  // Initializing the necessary Data
  ngOnInit(): void {
    this.statsService.fetchAdminStats().subscribe({
      // Success State
      next: (data: StatsDao) => console.log(data),

      // Error State
      error: (error: Error) => console.log(error),
    });
  }

  // This function is invoked when the librarians list component is clicked
  onLibrarianListClick() {
    this.router.navigate(['../', 'librarian-list'], { relativeTo: this.route });
  }

  // This function is invoked when the add a librarians component is clicked
  onAddLibrarianClick() {
    this.router.navigate(['../', 'librarian-add'], { relativeTo: this.route });
  }
}
