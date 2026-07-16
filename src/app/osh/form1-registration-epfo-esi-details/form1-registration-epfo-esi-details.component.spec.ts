import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1RegistrationEpfoEsiDetailsComponent } from './form1-registration-epfo-esi-details.component';

describe('Form1RegistrationEpfoEsiDetailsComponent', () => {
  let component: Form1RegistrationEpfoEsiDetailsComponent;
  let fixture: ComponentFixture<Form1RegistrationEpfoEsiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1RegistrationEpfoEsiDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form1RegistrationEpfoEsiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
