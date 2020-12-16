import { TestBed } from '@angular/core/testing';

import { DeletememberService } from './deletemember.service';

describe('DeletememberService', () => {
  let service: DeletememberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletememberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
