import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryWisePaymentManagerComponent } from './treasury-wise-payment-manager.component';

describe('TreasuryWisePaymentManagerComponent', () => {
  let component: TreasuryWisePaymentManagerComponent;
  let fixture: ComponentFixture<TreasuryWisePaymentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryWisePaymentManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryWisePaymentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
