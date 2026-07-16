import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppQrcodeRegistrationComponent } from './mobile-app-qrcode-registration.component';

describe('MobileAppQrcodeRegistrationComponent', () => {
  let component: MobileAppQrcodeRegistrationComponent;
  let fixture: ComponentFixture<MobileAppQrcodeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppQrcodeRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppQrcodeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
