import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerEditProjectComponent } from './manager-edit-project.component';
import { DatePipe } from '@angular/common';

describe('ManagerEditProjectComponent', () => {
  let component: ManagerEditProjectComponent;
  let fixture: ComponentFixture<ManagerEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ManagerEditProjectComponent ],
      providers: [ DatePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_edit_project_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_edit_project_heading_in_the_manager_edit_project_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Edit Project');
  });
});
