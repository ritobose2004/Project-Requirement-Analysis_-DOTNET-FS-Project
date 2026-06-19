import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerViewProjectComponent } from './manager-view-project.component';

describe('ManagerViewProjectComponent', () => {
  let component: ManagerViewProjectComponent;
  let fixture: ComponentFixture<ManagerViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ManagerViewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_view_project_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_projects_heading_in_the_manager_view_project_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Projects');
  });
});
