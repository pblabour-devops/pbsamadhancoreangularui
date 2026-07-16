import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeemedApplicationTimelineReportComponent } from './deemed-application-timeline-report.component';

describe('DeemedApplicationTimelineReportComponent', () => {
  let component: DeemedApplicationTimelineReportComponent;
  let fixture: ComponentFixture<DeemedApplicationTimelineReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeemedApplicationTimelineReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeemedApplicationTimelineReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
