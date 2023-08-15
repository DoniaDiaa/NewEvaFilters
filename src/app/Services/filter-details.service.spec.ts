import { TestBed } from '@angular/core/testing';

import { FilterDetailsService } from './filter-details.service';

describe('FilterDetailsService', () => {
  let service: FilterDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
