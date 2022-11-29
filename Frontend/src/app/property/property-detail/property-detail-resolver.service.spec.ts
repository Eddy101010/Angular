/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PropertyDetailResolverService } from '../../services/property-detail-resolver.service';

describe('Service: PropertyDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyDetailResolverService]
    });
  });

  it('should ...', inject([PropertyDetailResolverService], (service: PropertyDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
