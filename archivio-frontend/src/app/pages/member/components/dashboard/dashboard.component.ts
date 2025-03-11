import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // Injecting all the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

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
}
