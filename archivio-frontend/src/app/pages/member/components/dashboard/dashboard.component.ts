import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scaleUpAndFadeInAnimation } from 'src/app/shared/animations/scale-up-and-fade-in';
import { slideLeftEnterAnimation } from 'src/app/shared/animations/slide-left-enter';
import { StatsDao } from 'src/app/shared/Models/stats/StatsDao';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [scaleUpAndFadeInAnimation, slideLeftEnterAnimation],
})
export class DashboardComponent implements OnInit {
  // This is the stats data for the component
  statsData: StatsDao | null = null;

  // loading and Error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting all the necessary dependencies
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {}

  // Calling the api calls in the start and subscribing them
  ngOnInit(): void {
    // Setting the loading state
    this.isLoading = true;

    this.statsService.fetchMemberStats().subscribe({
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

  // This function is invoked when the user clicks the book list component
  onBookListClick() {
    this.router.navigate(['../', 'book-list'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the requested books components
  onRequestedBooksClick() {
    this.router.navigate(['../', 'requested-books'], {
      relativeTo: this.route,
    });
  }

  // This function is invoked when the user clicks on the return books component
  onReturnBooksClick() {
    this.router.navigate(['../', 'to-be-returned'], { relativeTo: this.route });
  }

  // This funciton is invoked when the error cancel button is clicked
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
