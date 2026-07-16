import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationMotorTransportDetailsComponent } from './form1-registration-motor-transport-details.component';

describe('Form1RegistrationMotorTransportDetailsComponent', () => {
  let component: Form1RegistrationMotorTransportDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationMotorTransportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationMotorTransportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationMotorTransportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
