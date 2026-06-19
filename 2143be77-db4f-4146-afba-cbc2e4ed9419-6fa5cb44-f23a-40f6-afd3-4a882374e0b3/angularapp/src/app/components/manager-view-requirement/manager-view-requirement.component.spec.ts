import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewRequirementComponent } from './manager-view-requirement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerViewRequirementComponent', () => {
  let component: ManagerViewRequirementComponent;
  let fixture: ComponentFixture<ManagerViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ManagerViewRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('Frontend_should_create_manager_view_requirement_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_all_project_requirements_heading_in_the_manager_view_requirement_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('All Project Requirements');
  });
});
