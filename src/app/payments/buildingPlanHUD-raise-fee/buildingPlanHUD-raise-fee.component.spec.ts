import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPlanHUD_Raise_FeeComponent } from './buildingPlanHUD-raise-fee.component';

describe('AppfeecalculatorComponent', () => {
  let component: BuildingPlanHUD_Raise_FeeComponent;
  let fixture: ComponentFixture<BuildingPlanHUD_Raise_FeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPlanHUD_Raise_FeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPlanHUD_Raise_FeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
