import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeePaymentCompleteTerminalComponent } from './app-fee-payment-complete-terminal.component';

describe('AppFeePaymentCompleteTerminalComponent', () => {
  let component: AppFeePaymentCompleteTerminalComponent;
  let fixture: ComponentFixture<AppFeePaymentCompleteTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFeePaymentCompleteTerminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeePaymentCompleteTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
