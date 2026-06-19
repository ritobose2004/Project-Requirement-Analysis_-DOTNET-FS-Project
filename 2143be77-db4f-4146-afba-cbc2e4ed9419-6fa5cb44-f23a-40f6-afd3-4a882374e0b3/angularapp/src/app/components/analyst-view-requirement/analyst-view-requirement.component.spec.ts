import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystViewRequirementComponent } from './analyst-view-requirement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnalystViewRequirementComponent', () => {
  let component: AnalystViewRequirementComponent;
  let fixture: ComponentFixture<AnalystViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

      declarations: [ AnalystViewRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_analyst_view_requirement_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_view_requirements_heading_in_the_analyst_view_requirement_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('View Requirements');
  });
});
