import { TestBed } from '@angular/core/testing';

import { AddbookService } from './addbook.service';

describe('AddbookService', () => {
  let service: AddbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
