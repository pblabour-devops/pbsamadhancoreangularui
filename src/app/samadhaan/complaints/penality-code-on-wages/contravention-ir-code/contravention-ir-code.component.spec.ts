import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraventionIrCodeComponent } from './contravention-ir-code.component';

describe('ContraventionIrCodeComponent', () => {
  let component: ContraventionIrCodeComponent;
  let fixture: ComponentFixture<ContraventionIrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContraventionIrCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContraventionIrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
