import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiPaymentWageActComponent } from './labour-part-iii-payment-wage-act.component';

describe('LabourPartIiiPaymentWageActComponent', () => {
  let component: LabourPartIiiPaymentWageActComponent;
  let fixture: ComponentFixture<LabourPartIiiPaymentWageActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiPaymentWageActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiPaymentWageActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
