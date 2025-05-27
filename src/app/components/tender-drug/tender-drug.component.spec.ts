import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDrugComponent } from './tender-drug.component';

describe('TenderDrugComponent', () => {
  let component: TenderDrugComponent;
  let fixture: ComponentFixture<TenderDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderDrugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
