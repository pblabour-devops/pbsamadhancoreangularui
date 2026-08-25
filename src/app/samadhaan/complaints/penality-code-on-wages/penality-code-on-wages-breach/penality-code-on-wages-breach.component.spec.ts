import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalityCodeOnWagesBreachComponent } from './penality-code-on-wages-breach.component';

describe('PenalityCodeOnWagesBreachComponent', () => {
  let component: PenalityCodeOnWagesBreachComponent;
  let fixture: ComponentFixture<PenalityCodeOnWagesBreachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenalityCodeOnWagesBreachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenalityCodeOnWagesBreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
