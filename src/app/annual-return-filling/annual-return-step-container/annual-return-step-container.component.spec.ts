import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReturnStepContainerComponent } from './annual-return-step-container.component';

describe('AnnualReturnStepContainerComponent', () => {
  let component: AnnualReturnStepContainerComponent;
  let fixture: ComponentFixture<AnnualReturnStepContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualReturnStepContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualReturnStepContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
