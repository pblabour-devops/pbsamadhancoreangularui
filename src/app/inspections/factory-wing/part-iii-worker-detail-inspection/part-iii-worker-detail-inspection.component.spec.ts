import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiWorkerDetailInspectionComponent } from './part-iii-worker-detail-inspection.component';

describe('PartIiiWorkerDetailInspectionComponent', () => {
  let component: PartIiiWorkerDetailInspectionComponent;
  let fixture: ComponentFixture<PartIiiWorkerDetailInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiWorkerDetailInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiWorkerDetailInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
