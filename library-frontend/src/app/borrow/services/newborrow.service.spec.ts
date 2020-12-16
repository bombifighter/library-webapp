import { TestBed } from '@angular/core/testing';

import { NewborrowService } from './newborrow.service';

describe('NewborrowService', () => {
  let service: NewborrowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewborrowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
