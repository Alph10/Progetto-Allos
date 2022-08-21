import { TestBed } from '@angular/core/testing';

import { GiacenzaService } from './giacenza.service';

describe('GiacenzaService', () => {
  let service: GiacenzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiacenzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
