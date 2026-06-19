import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule],});
    service = TestBed.inject(ProjectService);
  });

  fit('Frontend_should_be_create_project_service', () => {
    expect(service).toBeTruthy();
  });
});
