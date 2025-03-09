import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/Models/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // These are the details inputted by the user
  userInput = { email: '', password: '' };

  // Loading and Error States
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks the login button
  onLoginClick() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the API to login
    this.authService.login(this.userInput).subscribe({
      // Success State
      next: (user: User) => {
        this.isLoading = false;

        // Redirecting to the route
        this.router.navigate(['../../', user.role.toLowerCase()], {
          relativeTo: this.route,
        });
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the go to Register button
  onGoToRegisterClick() {
    this.router.navigate(['../', 'register'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel Error Button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
