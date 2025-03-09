import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // These are the details inputted by the user
  userInput = { firstname: '', lastname: '', username: '', password: '' };

  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks the register button
  onRegisterClick() {
    console.log(this.userInput);
  }

  // This function is invoked when the user clicks on the go to login button
  onGoToLoginClick() {
    this.router.navigate(['../', 'login'], { relativeTo: this.route });
  }
}
