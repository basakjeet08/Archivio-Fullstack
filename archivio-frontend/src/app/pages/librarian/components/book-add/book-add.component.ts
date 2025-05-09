import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { scaleUpAndFadeInAnimation } from 'src/app/shared/animations/scale-up-and-fade-in';
import { Book } from 'src/app/shared/Models/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
  animations: [scaleUpAndFadeInAnimation],
})
export class BookAddComponent implements OnInit {
  // These are the details inputted by the user
  userInput = { id: '', title: '', genre: '', description: '' };

  // These are the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  // Injecting the necessary dependencies
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // Checking if the page is in edit mode or add mode
  ngOnInit(): void {
    this.userInput.id = this.route.snapshot.queryParams['id'] || '';

    // Checking if the id is valid
    if (this.userInput.id) {
      // Setting the loading state
      this.isLoading = true;

      // Calling the api
      this.bookService.findBookById(this.userInput.id).subscribe({
        // Success State
        next: (book: Book) => {
          this.isLoading = false;
          this.isEditMode = true;

          // Setting the Book default Values
          this.userInput.title = book.title;
          this.userInput.genre = book.genre;
          this.userInput.description = book.description;
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

    // This is the api which we should call
    const observer = !this.isEditMode
      ? this.bookService.createBook(this.userInput)
      : this.bookService.updateBook(this.userInput);

    // Calling the api to add the book data
    observer.subscribe({
      // Success State
      next: () => {
        this.isLoading = false;

        // Redirecting to the previous page
        this.location.back();
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on cancel button
  onCancelClick() {
    this.location.back();
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
