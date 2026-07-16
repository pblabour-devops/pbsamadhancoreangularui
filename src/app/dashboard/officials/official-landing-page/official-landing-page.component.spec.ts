import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialLandingPageComponent } from './official-landing-page.component';

describe('OfficialLandingPageComponent', () => {
  let component: OfficialLandingPageComponent;
  let fixture: ComponentFixture<OfficialLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
