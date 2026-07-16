import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiEqualEnumerationActComponent } from './labour-part-iii-equal-enumeration-act.component';

describe('LabourPartIiiEqualEnumerationActComponent', () => {
  let component: LabourPartIiiEqualEnumerationActComponent;
  let fixture: ComponentFixture<LabourPartIiiEqualEnumerationActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiEqualEnumerationActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiEqualEnumerationActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
