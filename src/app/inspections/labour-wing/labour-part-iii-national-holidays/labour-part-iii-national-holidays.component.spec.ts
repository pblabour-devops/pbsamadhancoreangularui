import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiNationalHolidaysComponent } from './labour-part-iii-national-holidays.component';

describe('LabourPartIiiNationalHolidaysComponent', () => {
  let component: LabourPartIiiNationalHolidaysComponent;
  let fixture: ComponentFixture<LabourPartIiiNationalHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiNationalHolidaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiNationalHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
