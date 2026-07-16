import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionsDashboardComponent } from './inspections-dashboard.component';

describe('InspectionsDashboardComponent', () => {
  let component: InspectionsDashboardComponent;
  let fixture: ComponentFixture<InspectionsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
