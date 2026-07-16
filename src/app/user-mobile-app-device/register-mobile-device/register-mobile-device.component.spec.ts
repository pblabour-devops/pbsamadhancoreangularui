import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMobileDeviceComponent } from './register-mobile-device.component';

describe('RegisterMobileDeviceComponent', () => {
  let component: RegisterMobileDeviceComponent;
  let fixture: ComponentFixture<RegisterMobileDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMobileDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMobileDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
