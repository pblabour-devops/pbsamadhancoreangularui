import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiMaternityBenefitActComponent } from './labour-part-iii-maternity-benefit-act.component';

describe('LabourPartIiiMaternityBenefitActComponent', () => {
  let component: LabourPartIiiMaternityBenefitActComponent;
  let fixture: ComponentFixture<LabourPartIiiMaternityBenefitActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiMaternityBenefitActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiMaternityBenefitActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
