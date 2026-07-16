import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentWisePaymentDetailsComponent } from './establishment-wise-payment-details.component';

describe('EstablishmentWisePaymentDetailsComponent', () => {
  let component: EstablishmentWisePaymentDetailsComponent;
  let fixture: ComponentFixture<EstablishmentWisePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentWisePaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentWisePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
