import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalityCodeOnWagesGeneralDetailsComponent } from './penality-code-on-wages-general-details.component';

describe('PenalityCodeOnWagesGeneralDetailsComponent', () => {
  let component: PenalityCodeOnWagesGeneralDetailsComponent;
  let fixture: ComponentFixture<PenalityCodeOnWagesGeneralDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PenalityCodeOnWagesGeneralDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenalityCodeOnWagesGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
