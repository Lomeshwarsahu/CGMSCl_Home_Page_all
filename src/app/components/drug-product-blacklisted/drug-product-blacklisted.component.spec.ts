import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugProductBlacklistedComponent } from './drug-product-blacklisted.component';

describe('DrugProductBlacklistedComponent', () => {
  let component: DrugProductBlacklistedComponent;
  let fixture: ComponentFixture<DrugProductBlacklistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugProductBlacklistedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugProductBlacklistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
