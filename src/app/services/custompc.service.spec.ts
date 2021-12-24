import { TestBed } from '@angular/core/testing';

import { CustompcService } from './custompc.service';

describe('CustompcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustompcService = TestBed.get(CustompcService);
    expect(service).toBeTruthy();
  });
});
