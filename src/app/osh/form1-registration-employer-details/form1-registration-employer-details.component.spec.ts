import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationEmployerDetailsComponent } from './form1-registration-employer-details.component';

describe('Form1RegistrationEmployerDetailsComponent', () => {
  let component: Form1RegistrationEmployerDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationEmployerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationEmployerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationEmployerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
