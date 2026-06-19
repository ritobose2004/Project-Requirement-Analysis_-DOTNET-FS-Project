import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    Email: '',
    Password: ''
  };

  loginError: string = '';
  isLoading: boolean = false;   // 🔹 Loader state
  passwordVisible: boolean = false;

  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  login(form: NgForm) {
    if (form.invalid) return;

    this.loginError = '';
    this.isLoading = true;      

    this.service.login(form.value).subscribe(
      (data) => {
        console.log(data);

        if (this.service.isProjectManager() || this.service.isRequirementAnalyst()) {
          this.router.navigate(['/home']);
        }

        this.isLoading = false; 
      },
      (err) => {
        this.loginError = 'Invalid email or password';
        this.isLoading = false; 
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
