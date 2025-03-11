import { Component, OnInit } from '@angular/core';
import { BookRequest, Status } from 'src/app/shared/Models/BookRequest';
import { BookRequestService } from 'src/app/shared/services/book-request.service';

@Component({
  selector: 'app-requested-books',
  templateUrl: './requested-books.component.html',
  styleUrls: ['./requested-books.component.css'],
})
export class RequestedBooksComponent implements OnInit {
  // This is the book request list variable which contains the details of pending requests
  bookRequests: BookRequest[] = [];

  // Loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the required dependencies
  constructor(private bookRequestService: BookRequestService) {}

  // Initializing the initial data
  ngOnInit(): void {
    this.fetchData();
  }

  // This function fetches all the book lists which is current pending return
  fetchData() {
    // Setting the loading state
    this.isLoading = true;

    // Making the api calls
    this.bookRequestService.findByRequesterEmail().subscribe({
      // Success State
      next: (bookRequests: BookRequest[]) => {
        this.isLoading = false;
        this.bookRequests = bookRequests;
      },

      // Error States
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function sends the button text
  buttonText(bookRequest: BookRequest): string {
    return bookRequest.status === Status.REQUESTED
      ? 'Waiting for Approval'
      : bookRequest.status === Status.APPROVED
      ? 'Return Book'
      : 'Thanks for Borrowing';
  }

  // This function tells if the book can be returned right now or not
  shouldDisable(bookRequest: BookRequest): boolean {
    return bookRequest.status !== Status.APPROVED;
  }

  // This function is invoked when the user clicks on the return button
  onReturnClick(id: string) {
    // Setting the loading state
    this.isLoading = true;

    // Calling the API
    this.bookRequestService.returnBookRequest({ id, bookId: '' }).subscribe({
      // Success State
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
