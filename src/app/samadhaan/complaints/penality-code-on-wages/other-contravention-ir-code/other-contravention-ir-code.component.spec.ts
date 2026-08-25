import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherContraventionIrCodeComponent } from './other-contravention-ir-code.component';

describe('OtherContraventionIrCodeComponent', () => {
  let component: OtherContraventionIrCodeComponent;
  let fixture: ComponentFixture<OtherContraventionIrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherContraventionIrCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherContraventionIrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
