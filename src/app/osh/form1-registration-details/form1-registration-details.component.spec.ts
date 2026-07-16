import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationDetailsComponent } from './form1-registration-details.component';

describe('Form1RegistrationDetailsComponent', () => {
  let component: Form1RegistrationDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
