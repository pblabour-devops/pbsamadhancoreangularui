import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDigitalSignatureComponent } from './register-digital-signature.component';

describe('RegisterDigitalSignatureComponent', () => {
  let component: RegisterDigitalSignatureComponent;
  let fixture: ComponentFixture<RegisterDigitalSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDigitalSignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDigitalSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
