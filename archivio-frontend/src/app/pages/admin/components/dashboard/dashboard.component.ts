import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideLeftEnterAnimation } from 'src/app/shared/animations/slide-left-enter';
import { slideRightEnterAnimation } from 'src/app/shared/animations/slide-right-enter';
import { StatsDao } from 'src/app/shared/Models/stats/StatsDao';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideLeftEnterAnimation, slideRightEnterAnimation],
})
export class DashboardComponent implements OnInit {
  // This is the stats data for the component
  statsData: StatsDao | null = null;

  // loading and Error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {}

  // Calling the api calls in the start and subscribing them
  ngOnInit(): void {
    // Setting the loading state
    this.isLoading = true;

    this.statsService.fetchAdminStats().subscribe({
      // Success State
      next: (data: StatsDao) => {
        this.isLoading = false;
        this.statsData = data;
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
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

  // This funciton is invoked when the error cancel button is clicked
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
