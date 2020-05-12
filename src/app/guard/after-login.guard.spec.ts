import { TestBed, async, inject } from '@angular/core/testing';

import { AfterLoginGuard } from './after-login.guard';

describe('AfterLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfterLoginGuard]
    });
  });

  it('should ...', inject([AfterLoginGuard], (guard: AfterLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
