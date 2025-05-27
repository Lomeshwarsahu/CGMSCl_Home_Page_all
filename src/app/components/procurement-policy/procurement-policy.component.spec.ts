import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementPolicyComponent } from './procurement-policy.component';

describe('ProcurementPolicyComponent', () => {
  let component: ProcurementPolicyComponent;
  let fixture: ComponentFixture<ProcurementPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
