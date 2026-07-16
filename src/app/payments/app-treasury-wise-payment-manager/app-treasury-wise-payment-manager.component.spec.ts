import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTreasuryWisePaymentManagerComponent } from './app-treasury-wise-payment-manager.component';

describe('AppTreasuryWisePaymentManagerComponent', () => {
  let component: AppTreasuryWisePaymentManagerComponent;
  let fixture: ComponentFixture<AppTreasuryWisePaymentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTreasuryWisePaymentManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTreasuryWisePaymentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
