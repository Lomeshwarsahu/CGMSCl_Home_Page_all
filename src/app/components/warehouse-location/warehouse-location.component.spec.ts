import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLocationComponent } from './warehouse-location.component';

describe('WarehouseLocationComponent', () => {
  let component: WarehouseLocationComponent;
  let fixture: ComponentFixture<WarehouseLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
