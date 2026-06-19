import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerAddProjectComponent } from './manager-add-project.component';

describe('ManagerAddProjectComponent', () => {
  let component: ManagerAddProjectComponent;
  let fixture: ComponentFixture<ManagerAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ManagerAddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_add_project_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_create_new_project_heading_in_the_manager_add_project_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Create New Project');
  });
});
