import { TestBed } from '@angular/core/testing';

import { UserServerService } from './user-server.service';

describe('UserServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserServerService = TestBed.get(UserServerService);
    expect(service).toBeTruthy();
  });
});
