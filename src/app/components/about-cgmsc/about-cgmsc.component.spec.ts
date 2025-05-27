import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCGMSCComponent } from './about-cgmsc.component';

describe('AboutCGMSCComponent', () => {
  let component: AboutCGMSCComponent;
  let fixture: ComponentFixture<AboutCGMSCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCGMSCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCGMSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
