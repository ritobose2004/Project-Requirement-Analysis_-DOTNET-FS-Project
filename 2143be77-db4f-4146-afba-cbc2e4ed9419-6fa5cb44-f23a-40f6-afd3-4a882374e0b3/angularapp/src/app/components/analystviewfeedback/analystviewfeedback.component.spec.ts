import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystviewfeedbackComponent } from './analystviewfeedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnalystviewfeedbackComponent', () => {
  let component: AnalystviewfeedbackComponent;
  let fixture: ComponentFixture<AnalystviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ AnalystviewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('Frontend_should_create_analyst_view_feedback_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_my_feedback_heading_in_the_analyst_view_feedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('My Feedback');
  });
});
