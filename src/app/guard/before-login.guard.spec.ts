import { TestBed, async, inject } from '@angular/core/testing';

import { BeforeLoginGuard } from './before-login.guard';

describe('BeforeLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeforeLoginGuard]
    });
  });

  it('should ...', inject([BeforeLoginGuard], (guard: BeforeLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
