import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencewiseInspectionDashboardComponent } from './licencewise-inspection-dashboard.component';

describe('LicencewiseInspectionDashboardComponent', () => {
  let component: LicencewiseInspectionDashboardComponent;
  let fixture: ComponentFixture<LicencewiseInspectionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicencewiseInspectionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencewiseInspectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
