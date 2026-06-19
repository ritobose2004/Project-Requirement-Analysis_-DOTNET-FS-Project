import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-analystnav',
  templateUrl: './analystnav.component.html',
  styleUrls: ['./analystnav.component.css']
})
export class AnalystnavComponent implements OnInit {
  username:string='';
  showLogoutConfirmPopup: boolean = false; 

  get role(): string {
    return localStorage.getItem('Role') || 'RequirementAnalyst';
  }
  
  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {
    this.username=this.service.getUsername();
  }

  confirmLogout(): void {
    this.showLogoutConfirmPopup = false;
    this.service.logout();
    this.router.navigate(['/login']); 
  }

  showLogoutPopup(): void {
    this.showLogoutConfirmPopup = true;
  }

  closeLogoutPopup(): void {
    this.showLogoutConfirmPopup = false;
  }

  navigate(event: any) {
    const route = event.target.value;
    if (route) {
      this.router.navigate([route]);
    }
  }
}

