import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystnavComponent } from './analystnav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnalystnavComponent', () => {
  let component: AnalystnavComponent;
  let fixture: ComponentFixture<AnalystnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ AnalystnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_analystnav_component', () => {
    expect(component).toBeTruthy();
  });
});
