import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AnalystAddRequirementComponent } from './analyst-add-requirement.component';

describe('AnalystAddRequirementComponent', () => {
  let component: AnalystAddRequirementComponent;
  let fixture: ComponentFixture<AnalystAddRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ AnalystAddRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystAddRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_analyst_add_requirement_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_add_requirement_heading_in_the_analyst_add_requirement_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Add Requirement');
  });
});
