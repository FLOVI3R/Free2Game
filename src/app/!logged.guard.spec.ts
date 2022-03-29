import { TestBed } from '@angular/core/testing';

import { !loggedGuard } from './!logged.guard';

describe('!loggedGuard', () => {
  let guard: !loggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(!loggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
