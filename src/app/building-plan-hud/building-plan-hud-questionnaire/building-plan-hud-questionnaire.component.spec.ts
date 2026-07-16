import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPlanHudQuestionnaireComponent } from './building-plan-hud-questionnaire.component';

describe('BuildingPlanHudQuestionnaireComponent', () => {
  let component: BuildingPlanHudQuestionnaireComponent;
  let fixture: ComponentFixture<BuildingPlanHudQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPlanHudQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPlanHudQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
