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

    this.statsService.fetchLibrarianStats().subscribe({
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

  // This function is invoked when the user clicks on the book list component
  onBookListClick() {
    this.router.navigate(['../', 'book-list'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the add a book component
  onAddBookClick() {
    this.router.navigate(['../', 'book-add'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the book request component
  onBookRequestsClick() {
    this.router.navigate(['../', 'book-request'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the membership request component
  onMembershipClick() {
    this.router.navigate(['../', 'membership-request'], {
      relativeTo: this.route,
    });
  }

  // This funciton is invoked when the error cancel button is clicked
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
