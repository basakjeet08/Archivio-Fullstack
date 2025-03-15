import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { staggerAnimation } from 'src/app/shared/animations/list-stagger';
import { BookRequest } from 'src/app/shared/Models/BookRequest';
import { BookRequestService } from 'src/app/shared/services/book-request.service';

@Component({
  selector: 'app-book-request',
  templateUrl: './book-request.component.html',
  styleUrls: ['./book-request.component.css'],
  animations: [staggerAnimation],
})
export class BookRequestComponent implements OnInit {
  // This is the book request list variable which contains the details of all the book requests
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

  // This function fetches all the book lists
  fetchData() {
    // Setting the loading state
    this.isLoading = true;

    // Making the api calls
    this.bookRequestService.findAll().subscribe({
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

  // This function is invoked when the user clicks on the approve button
  onApproveClick(id: string) {
    // Setting the loading state
    this.isLoading = true;

    // Calling the API
    this.bookRequestService.approveBookRequest({ id, bookId: '' }).subscribe({
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

  // This function is invoked when the user clicks on the back button
  onBackButtonClick() {
    this.location.back();
  }

  // This function is invoked when the user clicks on the Cancel button for errors
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
