import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystaddfeedbackComponent } from './analystaddfeedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnalystaddfeedbackComponent', () => {
  let component: AnalystaddfeedbackComponent;
  let fixture: ComponentFixture<AnalystaddfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ AnalystaddfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystaddfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('Frontend_should_create_analystaddfeedback_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_add_feedback_heading_in_the_analystaddfeedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Add Feedback');
  });

});
