import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIGeneralDetailComponent } from './labour-part-i-general-detail.component';

describe('LabourPartIGeneralDetailComponent', () => {
  let component: LabourPartIGeneralDetailComponent;
  let fixture: ComponentFixture<LabourPartIGeneralDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIGeneralDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
