/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActionRegistryService } from './ActionRegistry.service';

describe('Service: ActionRegistry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionRegistryService]
    });
  });

  it('should ...', inject([ActionRegistryService], (service: ActionRegistryService) => {
    expect(service).toBeTruthy();
  }));
});
