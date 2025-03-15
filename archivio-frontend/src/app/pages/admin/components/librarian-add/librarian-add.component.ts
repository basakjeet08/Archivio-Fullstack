import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { scaleUpAndFadeInAnimation } from 'src/app/shared/animations/scale-up-and-fade-in';
import { User } from 'src/app/shared/Models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LibraryService } from 'src/app/shared/services/library.service';

@Component({
  selector: 'app-librarian-add',
  templateUrl: './librarian-add.component.html',
  styleUrls: ['./librarian-add.component.css'],
  animations: [scaleUpAndFadeInAnimation],
})
export class LibrarianAddComponent implements OnInit {
  // These are the details inputted by the user
  userInput = { id: '', name: '', email: '', password: '' };

  // These are the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private authService: AuthService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // Checking if the page is in edit more or add mode
  ngOnInit(): void {
    this.userInput.id = this.route.snapshot.queryParams['id'] || '';

    // Checking if the id is valid
    if (this.userInput.id) {
      // Setting the Loading State
      this.isLoading = true;

      // Calling the API
      this.libraryService.fetchById(this.userInput.id).subscribe({
        // Success State
        next: (librarian: User) => {
          this.isLoading = false;
          this.isEditMode = true;

          // Setting the default Values
          this.userInput.name = librarian.name;
          this.userInput.email = librarian.email;
        },

        // Error State
        error: (error: Error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        },
      });
    }
  }

  // This function is invoked when the user clicks the login button
  onSubmitClick() {
    // Setting the loading states
    this.isLoading = true;

    // This is the api which should be called
    const observer = !this.isEditMode
      ? this.authService.registerLibrarian(this.userInput)
      : this.libraryService.update(this.userInput);

    // Calling the api and handling the error or loading states
    observer.subscribe({
      // Success State
      next: () => {
        this.isLoading = false;

        // Redirecting the previous screen
        this.location.back();
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
    this.location.back();
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
