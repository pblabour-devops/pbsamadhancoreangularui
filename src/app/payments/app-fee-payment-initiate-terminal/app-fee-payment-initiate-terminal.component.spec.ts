import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeePaymentInitiateTerminalComponent } from './app-fee-payment-initiate-terminal.component';

describe('AppFeePaymentInitiateTerminalComponent', () => {
  let component: AppFeePaymentInitiateTerminalComponent;
  let fixture: ComponentFixture<AppFeePaymentInitiateTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFeePaymentInitiateTerminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeePaymentInitiateTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
