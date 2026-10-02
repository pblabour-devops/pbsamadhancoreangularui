import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalityCodeOnWagesOffenceComponent } from './penality-code-on-wages-offence.component';

describe('PenalityCodeOnWagesOffenceComponent', () => {
  let component: PenalityCodeOnWagesOffenceComponent;
  let fixture: ComponentFixture<PenalityCodeOnWagesOffenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PenalityCodeOnWagesOffenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenalityCodeOnWagesOffenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
