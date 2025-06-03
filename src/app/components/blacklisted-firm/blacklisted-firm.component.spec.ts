import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistedFirmComponent } from './blacklisted-firm.component';

describe('BlacklistedFirmComponent', () => {
  let component: BlacklistedFirmComponent;
  let fixture: ComponentFixture<BlacklistedFirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistedFirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlacklistedFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
