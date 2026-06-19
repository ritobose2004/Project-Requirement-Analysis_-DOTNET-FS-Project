
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private service: AuthService, private router: Router) {}

  get loggedIn(): boolean {
    return this.service.isLoggedIn();
  }
  get isProjectManager(): boolean {
    return this.service.isProjectManager();
  }
  get isRequirementAnalyst(): boolean {
    return this.service.isRequirementAnalyst();
  }

  goHome(): void {
    if (this.isProjectManager) {
      this.router.navigate(['/manager']);
    } else if (this.isRequirementAnalyst) {
      this.router.navigate(['/analyst']);
    } else {
      this.router.navigate(['/']);
    }
  }

}
