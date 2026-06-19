import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerviewfeedbackComponent } from './managerviewfeedback.component';

describe('ManagerviewfeedbackComponent', () => {
  let component: ManagerviewfeedbackComponent;
  let fixture: ComponentFixture<ManagerviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ManagerviewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_view_feedback_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_feedback_details_heading_in_the_manager_view_feedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Feedback Details');
  });
});
