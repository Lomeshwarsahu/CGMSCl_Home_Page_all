import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentArchiveComponent } from './recruitment-archive.component';

describe('RecruitmentArchiveComponent', () => {
  let component: RecruitmentArchiveComponent;
  let fixture: ComponentFixture<RecruitmentArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentArchiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
