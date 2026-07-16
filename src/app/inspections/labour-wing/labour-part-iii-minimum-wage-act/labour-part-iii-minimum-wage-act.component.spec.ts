import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiMinimumWageActComponent } from './labour-part-iii-minimum-wage-act.component';

describe('LabourPartIiiMinimumWageActComponent', () => {
  let component: LabourPartIiiMinimumWageActComponent;
  let fixture: ComponentFixture<LabourPartIiiMinimumWageActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiMinimumWageActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiMinimumWageActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
