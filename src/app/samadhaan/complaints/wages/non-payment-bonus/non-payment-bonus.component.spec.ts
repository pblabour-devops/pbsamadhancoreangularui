import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPaymentBonusComponent } from './non-payment-bonus.component';

describe('NonPaymentBonusComponent', () => {
  let component: NonPaymentBonusComponent;
  let fixture: ComponentFixture<NonPaymentBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonPaymentBonusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonPaymentBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
