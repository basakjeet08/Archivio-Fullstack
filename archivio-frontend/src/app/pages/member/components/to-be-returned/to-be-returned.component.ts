import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookRequest, Status } from 'src/app/shared/Models/BookRequest';
import { BookRequestService } from 'src/app/shared/services/book-request.service';

@Component({
  selector: 'app-to-be-returned',
  templateUrl: './to-be-returned.component.html',
  styleUrls: ['./to-be-returned.component.css'],
})
export class ToBeReturnedComponent implements OnInit {
  // This is the book request list variable which contains the details of pending requests
  bookRequests: BookRequest[] = [];

  // Loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the required dependencies
  constructor(
    private bookRequestService: BookRequestService,
    private location: Location
  ) {}

  // Initializing the initial data
  ngOnInit(): void {
    this.fetchData();
  }

  // This function fetches all the book lists which is current pending return
  fetchData() {
    // Setting the loading state
    this.isLoading = true;

    // Making the api calls
    this.bookRequestService
      .findByRequesterEmailAndStatus(Status.APPROVED)
      .subscribe({
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

  // This function is invoked when the user clicks on the go back button
  onBackButtonClick() {
    this.location.back();
  }

  // This function is invoked when the user clicks on the Cancel button for errors
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
