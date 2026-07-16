import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiPaymentBonusActStatutoryReportComponent } from './labour-part-iii-payment-bonus-act-statutory-report.component';

describe('LabourPartIiiPaymentBonusActStatutoryReportComponent', () => {
  let component: LabourPartIiiPaymentBonusActStatutoryReportComponent;
  let fixture: ComponentFixture<LabourPartIiiPaymentBonusActStatutoryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiPaymentBonusActStatutoryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiPaymentBonusActStatutoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
