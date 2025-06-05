import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDeptRecruitmentComponent } from './other-dept-recruitment.component';

describe('OtherDeptRecruitmentComponent', () => {
  let component: OtherDeptRecruitmentComponent;
  let fixture: ComponentFixture<OtherDeptRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherDeptRecruitmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDeptRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
