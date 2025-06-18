import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidRcComponent } from './valid-rc.component';

describe('ValidRcComponent', () => {
  let component: ValidRcComponent;
  let fixture: ComponentFixture<ValidRcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidRcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidRcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
