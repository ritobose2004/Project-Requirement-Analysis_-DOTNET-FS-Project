import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-manager-add-project',
  templateUrl: './manager-add-project.component.html',
  styleUrls: ['./manager-add-project.component.css']
})
export class ManagerAddProjectComponent {

  project: any = {
    projectTitle:'',
    projectDescription:'',
    startDate:'',
    endDate:'',
    frontEndTechStack:'',
    backendTechStack:'',
    database:'',
    status:''
  };

  submitted = false;
  titleExists = false;
  showSuccessPopup = false;

  constructor(private service: ProjectService, private router: Router) { }

  ngOnInit(): void {}

  addProject(form: NgForm) {

    this.submitted = true;
    this.titleExists = false;

    if(form.invalid)
    {
      return;
    }

    this.service.addProject(this.project).subscribe(
      () => {
        this.showSuccessPopup = true;
        form.resetForm();
        this.submitted = false;
      },
      (err) => {
        if (err.status === 409) {
          this.titleExists = true; 
        }
      });
  }

  closePopup() {
    this.showSuccessPopup = false;
    this.router.navigate(['/manager/view-project']);
  }
}
