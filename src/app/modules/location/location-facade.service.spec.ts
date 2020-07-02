import { TestBed } from '@angular/core/testing';

import { LocationFacadeService } from './location-facade.service';

describe('LocationFacadeService', () => {
  let service: LocationFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
