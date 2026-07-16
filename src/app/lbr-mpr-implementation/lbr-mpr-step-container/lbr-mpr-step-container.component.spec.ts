import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbrMprStepContainerComponent } from './lbr-mpr-step-container.component';

describe('LbrMprStepContainerComponent', () => {
  let component: LbrMprStepContainerComponent;
  let fixture: ComponentFixture<LbrMprStepContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbrMprStepContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LbrMprStepContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
