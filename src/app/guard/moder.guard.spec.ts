import { TestBed } from '@angular/core/testing';

import { ModerGuard } from './moder.guard';

describe('ModerGuard', () => {
  let guard: ModerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
