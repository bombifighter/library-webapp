import { TestBed } from '@angular/core/testing';

import { DeleteborrowService } from './deleteborrow.service';

describe('DeleteborrowService', () => {
  let service: DeleteborrowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteborrowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
