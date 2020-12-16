import { TestBed } from '@angular/core/testing';

import { AddmemberService } from './addmember.service';

describe('AddmemberService', () => {
  let service: AddmemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddmemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
