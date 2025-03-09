import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-librarian-add',
  templateUrl: './librarian-add.component.html',
  styleUrls: ['./librarian-add.component.css'],
})
export class LibrarianAddComponent {
  // These are the details inputted by the user
  userInput = { email: '', password: '' };

  // These are the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks the login button
  onSubmitClick() {
    console.log(this.userInput);

    this.router.navigate(['../', 'librarian-list'], { relativeTo: this.route });
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
