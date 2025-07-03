import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAREERSComponent } from './careers.component';

describe('CAREERSComponent', () => {
  let component: CAREERSComponent;
  let fixture: ComponentFixture<CAREERSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CAREERSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CAREERSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
