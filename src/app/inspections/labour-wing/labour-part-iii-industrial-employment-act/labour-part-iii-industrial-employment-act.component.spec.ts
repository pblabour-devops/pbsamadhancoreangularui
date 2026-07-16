import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiIndustrialEmploymentActComponent } from './labour-part-iii-industrial-employment-act.component';

describe('LabourPartIiiIndustrialEmploymentActComponent', () => {
  let component: LabourPartIiiIndustrialEmploymentActComponent;
  let fixture: ComponentFixture<LabourPartIiiIndustrialEmploymentActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiIndustrialEmploymentActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiIndustrialEmploymentActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
