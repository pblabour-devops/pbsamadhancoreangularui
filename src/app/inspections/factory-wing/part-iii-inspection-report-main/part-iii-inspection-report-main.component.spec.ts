import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiInspectionReportMainComponent } from './part-iii-inspection-report-main.component';

describe('PartIiiInspectionReportMainComponent', () => {
  let component: PartIiiInspectionReportMainComponent;
  let fixture: ComponentFixture<PartIiiInspectionReportMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiInspectionReportMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiInspectionReportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
