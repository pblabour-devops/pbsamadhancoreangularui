import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityClaimsComponent } from './gratuity-claims.component';

describe('GratuityClaimsComponent', () => {
  let component: GratuityClaimsComponent;
  let fixture: ComponentFixture<GratuityClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GratuityClaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GratuityClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
