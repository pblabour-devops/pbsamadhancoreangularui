import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartIiiWorkerDetailMusterRollComponent } from './part-iii-worker-detail-muster-roll.component';

describe('PartIiiWorkerDetailMusterRollComponent', () => {
  let component: PartIiiWorkerDetailMusterRollComponent;
  let fixture: ComponentFixture<PartIiiWorkerDetailMusterRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartIiiWorkerDetailMusterRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartIiiWorkerDetailMusterRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
