import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  user = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };

  confirmPasswordVisible = false;
  isLoading = false;

 
  registerError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleConfirmVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  register(formData: NgForm) {


    this.user.Email = this.user.Email.trim() 
    if (formData.invalid || this.user.Password !== this.user.ConfirmPassword) {
      return;
    }

    this.isLoading = true;
    this.registerError = '';

    this.authService.register(formData.value).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (err) => {
        this.isLoading = false;

        
        if (err.status === 400 && err.error?.message) {
          this.registerError = err.error.message;
        } else {
          this.registerError = 'Registration failed. Please try again.';
        }
      }
    );
  }
}
