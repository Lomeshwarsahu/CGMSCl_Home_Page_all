import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugWarehousesComponent } from './drug-warehouses.component';

describe('DrugWarehousesComponent', () => {
  let component: DrugWarehousesComponent;
  let fixture: ComponentFixture<DrugWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugWarehousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
