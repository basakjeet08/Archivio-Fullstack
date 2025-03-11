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

  // This function is invoked when the librarians list component is clicked
  onLibrarianListClick() {
    this.router.navigate(['../', 'librarian-list'], { relativeTo: this.route });
  }

  // This function is invoked when the add a librarians component is clicked
  onAddLibrarianClick() {
    this.router.navigate(['../', 'librarian-add'], { relativeTo: this.route });
  }
}
