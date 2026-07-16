import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimUnderCodeOnWagesComponent } from './claim-under-code-on-wages.component';

describe('ClaimUnderCodeOnWagesComponent', () => {
  let component: ClaimUnderCodeOnWagesComponent;
  let fixture: ComponentFixture<ClaimUnderCodeOnWagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimUnderCodeOnWagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimUnderCodeOnWagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
