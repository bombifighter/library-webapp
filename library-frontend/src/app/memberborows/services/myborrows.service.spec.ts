import { TestBed } from '@angular/core/testing';

import { MyborrowsService } from './myborrows.service';

describe('MyborrowsService', () => {
  let service: MyborrowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyborrowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
