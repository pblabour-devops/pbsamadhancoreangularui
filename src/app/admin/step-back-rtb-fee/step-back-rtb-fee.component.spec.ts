import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBackRtbFeeComponent } from './step-back-rtb-fee.component';

describe('StepBackRtbFeeComponent', () => {
  let component: StepBackRtbFeeComponent;
  let fixture: ComponentFixture<StepBackRtbFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepBackRtbFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBackRtbFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
