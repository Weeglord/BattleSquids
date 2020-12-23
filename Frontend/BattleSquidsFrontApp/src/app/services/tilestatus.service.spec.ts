import { TestBed } from '@angular/core/testing';

import { TilestatusService } from './tilestatus.service';

describe('TilestatusService', () => {
  let service: TilestatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TilestatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
