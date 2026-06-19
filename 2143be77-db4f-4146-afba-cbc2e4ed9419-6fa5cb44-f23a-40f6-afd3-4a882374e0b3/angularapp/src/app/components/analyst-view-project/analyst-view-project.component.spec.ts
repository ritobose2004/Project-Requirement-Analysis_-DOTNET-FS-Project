import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AnalystViewProjectComponent } from './analyst-view-project.component';

describe('AnalystViewProjectComponent', () => {
  let component: AnalystViewProjectComponent;
  let fixture: ComponentFixture<AnalystViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ AnalystViewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_analyst_view_project_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_projects_heading_in_the_analyst_view_project_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Projects');
  });
});
