import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagernavComponent implements OnInit {
  username:string='';

  showLogoutConfirmPopup: boolean = false; 

  get role(): string {
    return localStorage.getItem('Role') || 'ProjectManager';
  }

  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {
    this.username=this.service.getUsername();
  }

  showLogoutPopup(): void {
    this.showLogoutConfirmPopup = true;
  }

  closeLogoutPopup(): void {
    this.showLogoutConfirmPopup = false;
  }

  confirmLogout(): void {
    this.showLogoutConfirmPopup = false; 
    this.service.logout(); 
    this.router.navigate(['/login']); 
  }

  navigate(event: any) {
    const route = event.target.value;
    if (route) {
      this.router.navigate([route]);
    }
  }
}
