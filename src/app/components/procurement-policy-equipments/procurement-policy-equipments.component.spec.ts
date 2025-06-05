import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementPolicyEquipmentsComponent } from './procurement-policy-equipments.component';

describe('ProcurementPolicyEquipmentsComponent', () => {
  let component: ProcurementPolicyEquipmentsComponent;
  let fixture: ComponentFixture<ProcurementPolicyEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementPolicyEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementPolicyEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
