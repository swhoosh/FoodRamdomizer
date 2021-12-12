import { TestBed } from '@angular/core/testing';

import { MyDataProviderService } from './my-data-provider.service';

describe('MyDataProviderService', () => {
  let service: MyDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
