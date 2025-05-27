import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderCivilComponent } from './tender-civil.component';

describe('TenderCivilComponent', () => {
  let component: TenderCivilComponent;
  let fixture: ComponentFixture<TenderCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderCivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
