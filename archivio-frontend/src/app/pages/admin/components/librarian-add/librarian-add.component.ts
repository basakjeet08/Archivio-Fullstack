import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-librarian-add',
  templateUrl: './librarian-add.component.html',
  styleUrls: ['./librarian-add.component.css'],
})
export class LibrarianAddComponent {
  // These are the details inputted by the user
  userInput = { name: '', email: '', password: '' };

  // These are the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks the login button
  onSubmitClick() {
    // Setting the loading states
    this.isLoading = true;

    // Calling the api
    this.authService.registerLibrarian(this.userInput).subscribe({
      // Success State
      next: () => {
        this.isLoading = false;

        // Redirecting the admin to the list page
        this.router.navigate(['../', 'librarian-list'], {
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
  onCancelClick() {
    this.router.navigate(['../', 'librarian-list'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
