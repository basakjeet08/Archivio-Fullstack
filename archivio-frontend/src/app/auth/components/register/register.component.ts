import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scaleUpAndFadeInAnimation } from 'src/app/shared/animations/scale-up-and-fade-in';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [scaleUpAndFadeInAnimation],
})
export class RegisterComponent {
  // These are the details inputted by the user
  userInput = { firstname: '', lastname: '', email: '', password: '' };

  // Error and loading states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks the register button
  onRegisterClick() {
    // Setting the loading state
    this.isLoading = true;
    const name = this.userInput.firstname + ' ' + this.userInput.lastname;

    // Calling the api to register the user as Member
    this.authService
      .registerMember({
        name: name.trim(),
        email: this.userInput.email,
        password: this.userInput.password,
      })
      .subscribe({
        // Success State
        next: () => {
          this.isLoading = false;

          // Redirecting to the login Screen
          this.onGoToLoginClick();
        },

        // Error State
        error: (error: Error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        },
      });
  }

  // This function is invoked when the user clicks on the go to login button
  onGoToLoginClick() {
    this.router.navigate(['../', 'login'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
