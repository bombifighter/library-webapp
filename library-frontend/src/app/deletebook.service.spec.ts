import { TestBed } from '@angular/core/testing';

import { DeletebookService } from './deletebook.service';

describe('DeletebookService', () => {
  let service: DeletebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
