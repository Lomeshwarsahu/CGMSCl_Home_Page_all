import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderEquipmentComponent } from './tender-equipment.component';

describe('TenderEquipmentComponent', () => {
  let component: TenderEquipmentComponent;
  let fixture: ComponentFixture<TenderEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderEquipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
