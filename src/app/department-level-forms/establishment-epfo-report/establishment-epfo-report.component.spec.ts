import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentEpfoReportComponent } from './establishment-epfo-report.component';

describe('EstablishmentEpfoReportComponent', () => {
  let component: EstablishmentEpfoReportComponent;
  let fixture: ComponentFixture<EstablishmentEpfoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentEpfoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentEpfoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
