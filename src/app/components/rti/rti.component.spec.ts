import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTIComponent } from './rti.component';

describe('RTIComponent', () => {
  let component: RTIComponent;
  let fixture: ComponentFixture<RTIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RTIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
