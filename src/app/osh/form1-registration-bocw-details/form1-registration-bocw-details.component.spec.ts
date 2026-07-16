import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationBocwDetailsComponent } from './form1-registration-bocw-details.component';

describe('Form1RegistrationBocwDetailsComponent', () => {
  let component: Form1RegistrationBocwDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationBocwDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationBocwDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationBocwDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
