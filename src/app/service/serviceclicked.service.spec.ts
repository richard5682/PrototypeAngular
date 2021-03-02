/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceclickedService } from './serviceclicked.service';

describe('Service: Serviceclicked', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceclickedService]
    });
  });

  it('should ...', inject([ServiceclickedService], (service: ServiceclickedService) => {
    expect(service).toBeTruthy();
  }));
});
