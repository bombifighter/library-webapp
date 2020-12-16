import { TestBed } from '@angular/core/testing';

import { ModifymemberService } from './modifymember.service';

describe('ModifymemberService', () => {
  let service: ModifymemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifymemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
