import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-manager-edit-project',
  templateUrl: './manager-edit-project.component.html',
  styleUrls: ['./manager-edit-project.component.css']
})
export class ManagerEditProjectComponent implements OnInit {

  project: any;

  projectId:number;
  titleExists: boolean = false;
  showSuccessPopup: boolean = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.projectId=Number(params['id']);
      this.projectService.getProjectById(this.projectId).subscribe((data)=>{
        this.project=data;

        if (this.project.startDate && typeof this.project.startDate === 'string' && this.project.startDate.includes('T')) {
            this.project.startDate = this.project.startDate.split('T')[0];
        }
        if (this.project.endDate && typeof this.project.endDate === 'string' && this.project.endDate.includes('T')) {
            this.project.endDate = this.project.endDate.split('T')[0];
        }
      })
    })
  }

  editProject(form: NgForm): void {
    console.log('Submitting Project ID:', this.project.projectId);
    console.log('Submitting Project Data:', this.project);
    this.titleExists = false; 

    if (form.invalid) {
      return;
    }

    this.projectService.updateProject(this.project.projectId, this.project).subscribe(()=>{
      this.showSuccessPopup=true;
    });
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/manager/view-project']);
  }
}
