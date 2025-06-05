import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementPolicyDrugsComponent } from './procurement-policy-drugs.component';

describe('ProcurementPolicyDrugsComponent', () => {
  let component: ProcurementPolicyDrugsComponent;
  let fixture: ComponentFixture<ProcurementPolicyDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementPolicyDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementPolicyDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
