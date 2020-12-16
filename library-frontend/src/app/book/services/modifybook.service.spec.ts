import { TestBed } from '@angular/core/testing';

import { ModifybookService } from './modifybook.service';

describe('ModifybookService', () => {
  let service: ModifybookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifybookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
