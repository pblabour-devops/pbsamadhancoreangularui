import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationPrincipalEmployerDetailsComponent } from './form1-registration-principal-employer-details.component';

describe('Form1RegistrationPrincipalEmployerDetailsComponent', () => {
  let component: Form1RegistrationPrincipalEmployerDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationPrincipalEmployerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationPrincipalEmployerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationPrincipalEmployerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
