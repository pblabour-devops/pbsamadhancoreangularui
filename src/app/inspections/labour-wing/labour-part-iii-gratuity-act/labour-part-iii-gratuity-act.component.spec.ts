import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiGratuityActComponent } from './labour-part-iii-gratuity-act.component';

describe('LabourPartIiiGratuityActComponent', () => {
  let component: LabourPartIiiGratuityActComponent;
  let fixture: ComponentFixture<LabourPartIiiGratuityActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiGratuityActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiGratuityActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
