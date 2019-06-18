import { TestBed } from '@angular/core/testing';

import { Ui } from './ui.service';

describe('Ui', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [Ui]
    })
  );

  it('should be created', () => {
    const service: Ui = TestBed.get(Ui);
    expect(service).toBeTruthy();
  });
});
