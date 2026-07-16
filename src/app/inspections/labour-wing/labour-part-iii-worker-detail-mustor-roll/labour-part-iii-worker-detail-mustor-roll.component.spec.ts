import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourPartIiiWorkerDetailMustorRollComponent } from './labour-part-iii-worker-detail-mustor-roll.component';

describe('LabourPartIiiWorkerDetailMustorRollComponent', () => {
  let component: LabourPartIiiWorkerDetailMustorRollComponent;
  let fixture: ComponentFixture<LabourPartIiiWorkerDetailMustorRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourPartIiiWorkerDetailMustorRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourPartIiiWorkerDetailMustorRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
