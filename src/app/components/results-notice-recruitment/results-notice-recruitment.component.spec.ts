import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsNoticeRecruitmentComponent } from './results-notice-recruitment.component';

describe('ResultsNoticeRecruitmentComponent', () => {
  let component: ResultsNoticeRecruitmentComponent;
  let fixture: ComponentFixture<ResultsNoticeRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsNoticeRecruitmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsNoticeRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
