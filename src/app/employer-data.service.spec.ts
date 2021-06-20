import { TestBed } from '@angular/core/testing';

import { EmployerDataService } from './employer-data.service';

describe('EmployerDataService', () => {
  let service: EmployerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
