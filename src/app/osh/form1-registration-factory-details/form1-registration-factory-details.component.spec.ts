import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationFactoryDetailsComponent } from './form1-registration-factory-details.component';

describe('Form1RegistrationFactoryDetailsComponent', () => {
  let component: Form1RegistrationFactoryDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationFactoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationFactoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationFactoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
