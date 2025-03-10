import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent {
  // These are the details inputted by the user
  userInput = { id: '', title: '', genre: '', description: '' };

  // These are the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks the login button
  onSubmitClick() {
    // Setting the loading states
    this.isLoading = true;

    // Calling the api to add the book data
    this.bookService.createBook(this.userInput).subscribe({
      // Success State
      next: () => {
        this.isLoading = false;

        // Redirecting to the book list page
        this.router.navigate(['../', 'book-list'], { relativeTo: this.route });
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
    this.router.navigate(['../', 'book-list'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
