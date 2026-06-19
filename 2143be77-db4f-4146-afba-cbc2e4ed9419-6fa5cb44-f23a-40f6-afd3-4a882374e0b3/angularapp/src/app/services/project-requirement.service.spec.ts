import { TestBed } from '@angular/core/testing';

import { ProjectRequirementService } from './project-requirement.service';

describe('ProjectRequirementService', () => {
  let service: ProjectRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectRequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
