import { staggerAnimation } from 'src/app/shared/animations/list-stagger';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/Models/User';
import { LibraryService } from 'src/app/shared/services/library.service';

@Component({
  selector: 'app-librarian-list',
  templateUrl: './librarian-list.component.html',
  styleUrls: ['./librarian-list.component.css'],
  animations: [staggerAnimation],
})
export class LibrarianListComponent implements OnInit {
  // This is the librarian list variable which contains the details of all the librarians
  librarianList: User[] = [];

  // Loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private libraryService: LibraryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // Initializing the data when the components loads
  ngOnInit(): void {
    this.fetchData();
  }

  // This function fetches all the librarians data and updates the component list
  fetchData() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.libraryService.fetchAll().subscribe({
      // Success State
      next: (librarianList: User[]) => {
        this.isLoading = false;
        this.librarianList = librarianList;

        if (this.librarianList.length === 0) {
          this.errorMessage = 'No Librarian Data in the Database !!';
        }
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the edit button
  onEditClick(id: string) {
    this.router.navigate(['../', 'librarian-add'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  // This function is invoked when the user clicks on the delete button
  onDeleteClick(id: string) {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.libraryService.deleteById(id).subscribe({
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

  // This function is invoked when the user clicks on go back button
  onGoBackClick() {
    this.location.back();
  }

  // This function is invoked when the user clicks on the Cancel button for errors
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
