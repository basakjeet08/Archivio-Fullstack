import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/shared/Models/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  // This is the book list variable which contains the details of all the books
  bookList: Book[] = [];

  // Loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the required dependencies
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Initializing the data when the components loads
  ngOnInit(): void {
    this.fetchData();
  }

  // This function fetches all the book list data and updates the component
  fetchData() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.bookService.findAllBooks().subscribe({
      // Success State
      next: (books: Book[]) => {
        this.isLoading = false;
        this.bookList = books;

        if (this.bookList.length === 0) {
          this.errorMessage = 'No Book Data is in the database !!';
        }
      },

      // Error States
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the edit button
  onEditClick(id: string) {
    this.router.navigate(['../', 'book-add'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  // This funciton is invoked when the user clicks on the delete button
  onDeleteClick(id: string) {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.bookService.deleteById(id).subscribe({
      // Success state
      next: () => {
        this.isLoading = false;
        this.fetchData();
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the Cancel button for errors
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
