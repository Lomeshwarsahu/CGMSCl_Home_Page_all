import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeCircularComponent } from './notice-circular.component';

describe('NoticeCircularComponent', () => {
  let component: NoticeCircularComponent;
  let fixture: ComponentFixture<NoticeCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeCircularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
