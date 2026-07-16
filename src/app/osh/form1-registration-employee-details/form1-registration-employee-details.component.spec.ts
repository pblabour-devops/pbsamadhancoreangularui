import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationEmployeeDetailsComponent } from './form1-registration-employee-details.component';

describe('Form1RegistrationEmployeeDetailsComponent', () => {
  let component: Form1RegistrationEmployeeDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationEmployeeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
