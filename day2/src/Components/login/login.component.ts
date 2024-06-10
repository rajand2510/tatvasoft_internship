import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginSuccess: boolean = false;
  message: string = '';

  registeredUsers = [
    { email: 'rajand2510@gmail.com', password: 'Rajan@123' },
    { email: 'student2@example.com', password: 'Rajan@12' },
    { email: 'student3@example.com', password: 'Rajan@123' }
  ];

  onSubmit() {
    const user = this.registeredUsers.find(
      user => user.email === this.username && user.password === this.password
    );
    if (user) {
      this.loginSuccess = true;
      this.message = 'Successfully registered';
    } else {
      this.loginSuccess = false;
      this.message = 'Invalid credentials';
    }
  }
}
