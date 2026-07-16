import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyFormComponent } from './privacy-policy-form.component';

describe('PrivacyPolicyFormComponent', () => {
  let component: PrivacyPolicyFormComponent;
  let fixture: ComponentFixture<PrivacyPolicyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
