import { TestBed } from '@angular/core/testing';

import { SignedInAuthGuard } from './signed-in-auth.guard';

describe('SignedInAuthGuard', () => {
  let guard: SignedInAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignedInAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
