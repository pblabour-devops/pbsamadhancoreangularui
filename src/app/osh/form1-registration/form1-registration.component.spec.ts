import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationComponent } from './form1-registration.component';

describe('Form1RegistrationComponent', () => {
  let component: Form1RegistrationComponent;
  let fixture: ComponentFixture<Form1RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
