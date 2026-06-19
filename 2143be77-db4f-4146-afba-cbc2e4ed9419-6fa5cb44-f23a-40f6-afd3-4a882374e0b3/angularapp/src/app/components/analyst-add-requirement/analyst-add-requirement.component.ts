import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectRequirementService } from 'src/app/services/project-requirement.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectRequirement } from 'src/app/models/projectRequirement.model';

@Component({
  selector: 'app-analyst-add-requirement',
  templateUrl: './analyst-add-requirement.component.html',
  styleUrls: ['./analyst-add-requirement.component.css']
})
export class AnalystAddRequirementComponent implements OnInit {
  userId: number;
  showSuccessPopup: boolean = false;

  newRequirement: ProjectRequirement = {
    UserId: null,
    RequirementTitle: '',
    RequirementDescription: '',
    Status: 'Pending'
  }


  constructor(private service: ProjectRequirementService, private router: Router, private route: ActivatedRoute, private authservice: AuthService) { }

  ngOnInit() {
    this.userId = Number(this.authservice.getUserId());
    this.newRequirement.UserId = this.userId;
    console.log(this.userId);
  }

  addRequest(reqForm: NgForm) {
    if (reqForm.valid) {
      console.log('Submitting requirement:', this.newRequirement);
      
      this.service.addProjectRequirement(this.newRequirement).subscribe({
        next: (msg: string) => {
          console.log('Success:', msg);
          this.showSuccessPopup = true;
          reqForm.resetForm({ Status: 'Pending', UserId: this.userId }); 
        },
        error: (err) => {
          console.error('Submission failed:', err);
          alert('Failed to add requirement. Please check your connection.');
        }
      });      
    }
  }


  onOkClick() {
    this.showSuccessPopup = false; 
    this.router.navigate(['analyst/view-requirement']);
  }
}
