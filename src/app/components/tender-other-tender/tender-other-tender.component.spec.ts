import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderOtherTenderComponent } from './tender-other-tender.component';

describe('TenderOtherTenderComponent', () => {
  let component: TenderOtherTenderComponent;
  let fixture: ComponentFixture<TenderOtherTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderOtherTenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderOtherTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
