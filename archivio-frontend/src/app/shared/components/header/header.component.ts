import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Title for the header component which will be shown in the navigation bar
  @Input('title') title: string = '';

  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks the logout button
  onLogoutClick() {
    this.router.navigate(['../', 'auth'], { relativeTo: this.route });
  }
}
