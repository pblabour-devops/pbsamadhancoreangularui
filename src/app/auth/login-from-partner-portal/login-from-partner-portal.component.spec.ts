import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFromPartnerPortalComponent } from './login-from-partner-portal.component';

describe('LoginFromPartnerPortalComponent', () => {
  let component: LoginFromPartnerPortalComponent;
  let fixture: ComponentFixture<LoginFromPartnerPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFromPartnerPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFromPartnerPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
