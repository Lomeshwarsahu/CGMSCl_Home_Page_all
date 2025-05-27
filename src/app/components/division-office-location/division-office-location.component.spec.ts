import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionOfficeLocationComponent } from './division-office-location.component';

describe('DivisionOfficeLocationComponent', () => {
  let component: DivisionOfficeLocationComponent;
  let fixture: ComponentFixture<DivisionOfficeLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisionOfficeLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionOfficeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
