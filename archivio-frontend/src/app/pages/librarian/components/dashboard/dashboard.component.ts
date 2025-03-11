import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

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
}
