import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationContractorsDetailsComponent } from './form1-registration-contractors-details.component';

describe('Form1RegistrationContractorsDetailsComponent', () => {
  let component: Form1RegistrationContractorsDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationContractorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationContractorsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationContractorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
