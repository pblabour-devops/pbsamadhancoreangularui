import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiLwfActComponent } from './labour-part-iii-lwf-act.component';

describe('LabourPartIiiLwfActComponent', () => {
  let component: LabourPartIiiLwfActComponent;
  let fixture: ComponentFixture<LabourPartIiiLwfActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiLwfActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiLwfActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
